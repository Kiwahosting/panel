import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import AuthLayout from 'layouts/AuthLayout';
import AuthEmailChallenge from 'templates/auth/AuthEmailChallenge';
import { Transition, TransitionGroup } from 'react-transition-group';
import clsx from 'clsx';
import AuthPasswordChallenge from 'templates/auth/AuthPasswordChallenge';

const styles = theme => createStyles({
  outer: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    transition: 'height 300ms cubic-bezier(0.4,0,0.2,1)',
  },
  challenge: {
    position: 'absolute',
    transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
    width: '100%',
    top: '0px',
  },
  challenge_entering: {
    transform: 'translateX(100%)',
  },
  challenge_entered: {
    transform: 'translateX(0)',
  },
  challenge_exiting: {
    transform: 'translateX(-100%)',
  },
  challenge_exited: {
    transform: 'translateX(100%)',
  },
  container: {
    position: 'relative',
    padding: theme.spacing.unit * 3,
    width: '100%',
  },
});

let key = 'id0';
function SignIn({ classes: c }) {
  const [challenge, setChallenge] = useState({ Comp: AuthEmailChallenge });
  const [outerRef, setOuterRef] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);
  
  return <AuthLayout>
    <div className={c.outer} style={{ height: contentHeight + 'px' }} ref={(elem) => {
      setOuterRef(elem);
      if (outerRef) {
        outerRef.scrollLeft = 0;
      }
    }}>
      <TransitionGroup>
        <Transition key={key} timeout={{
          enter: 0,
          appear: 0,
          exit: 300,
        }} unmountOnExit={true}>
          {
            ((innerKey) => {
              return state => (
                <div className={clsx(c.challenge, c['challenge_' + state])}>
                  <div className={c.container} id={innerKey} ref={(elem) => {
                    if (elem) {
                      if (elem.id === key) {
                        setContentHeight(elem.offsetHeight);
                      }
                    }
                  }}>
                    <challenge.Comp
                      setChallenge={(challenge) => {
                        key = 'id' + Math.random();
                        setChallenge({ Comp: challenge });
                      }}
                    />
                  </div>
                </div>
              );
            })(key)
          }
        </Transition>
      </TransitionGroup>
    </div>
  </AuthLayout>;
}

export default hot(withStyles(styles)(SignIn));
