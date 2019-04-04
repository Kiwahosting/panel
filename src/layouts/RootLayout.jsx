import React, { useState, useLayoutEffect } from 'react';
import posed, { PoseGroup } from 'react-pose';
import AuthLayout from './AuthLayout';
import withRoot from 'withRoot';

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
    transition: ({ animate }) => ({ duration: animate ? 200 : 0 }),
  },
  exit: {
    opacity: 0,
    transition: ({ animate }) => ({ duration: animate ? 200 : 0 }),
  },
});
const ContentContainer = posed.div({
  visible: {
    height: ({ height }) => height,
    transition: ({ animate }) => ({ duration: animate ? 200 : 0 }),
  },
});

function Layout({ children, location, pageContext: { layout } }) {
  
  if (layout === 'auth') {
    if(typeof document === 'undefined') {
      return <AuthLayout>
        <div
          style={{
            position: 'relative',
            transition: 'height 0s',
            width: '100%',
            overflow: 'hidden',
          }}>
          <RoutesContainer
            key={location.key}
            style={{
              width: '100%',
              position: 'absolute',
              left: '0px',
              opacity: '1',
              transform: 'none',
              transformOrigin: '0% 50% 0px',
            }}
          >
            {children}
          </RoutesContainer>
        </div>
      </AuthLayout>;
    }

    const [height, setHeight] = useState(undefined);
    const [animate, setAnimate] = useState(false);
    const [extra, setExtra] = useState(0);
    
    useLayoutEffect(() => {
      setTimeout(() => {
        setExtra(1);
      }, 200);
      setTimeout(() => {
        setExtra(2);
      }, 200);
    }, []);

    return <AuthLayout>
      <ContentContainer
        pose='visible'
        height={height}
        animate={animate}
        poseKey={height}
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}>
        <PoseGroup>
          <RoutesContainer
            key={location.key + extra}
            poseKey={animate}
            style={{ width: '100%', position: 'absolute', left: '0' }}
            ref={elem => {
              if (!elem) return;
              if (height !== undefined) setAnimate(true);
              setHeight(elem.offsetHeight);
            }}
          >
            {children}
          </RoutesContainer>
        </PoseGroup>
      </ContentContainer>
    </AuthLayout>;
  } else {
    return children;
  }
}

export default withRoot(Layout);
