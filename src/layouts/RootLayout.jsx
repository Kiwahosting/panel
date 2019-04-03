import React, { useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import AuthLayout from './AuthLayout';
import withRoot from 'withRoot';

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 200 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 200 },
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
    const [height, setHeight] = useState(undefined);
    const [animate, setAnimate] = useState(false);
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
            key={location.key}
            style={{ width: '100%', position: 'absolute' }}
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
