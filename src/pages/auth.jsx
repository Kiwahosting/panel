import React, { Component, useState } from 'react';
import { isLoggedIn } from 'api';
import { navigate } from 'gatsby';
import {
  withStyles,
  createStyles,
} from '@material-ui/core';
import AuthEmailChallenge from 'templates/auth/AuthEmailChallenge';
import { TransitionGroup, Transition } from 'react-transition-group';

const styles = theme => createStyles({
  container: {
    position: 'relative',
    padding: theme.spacing.unit * 3,
    width: '100%',
  },
  wrapper: {
    width: '100%',
    position: 'relative',
  },
});

const defaultStyle = {
  transition: `left ${300}ms ease-in-out`,
  position: 'absolute',
  top: '0',
  width: '100%',
  left: '125%',
};

const transitionStyles = {
  entered: { left: '0%' },
  entering: { left: '125%' },
  exiting: { left: '-125%' },
  exited: { left: '125%' },
};

function AuthPage(props) {
  const [inProp, setInProp] = useState(true);
  const { classes: c } = props;

  if (isLoggedIn()) {
    // If we’re logged in, redirect to the panel.
    setTimeout(() => {
      navigate('/panel');
    }, 100);
    return null;
  }

  return <div className={c.container}>
    <button onClick={() => setInProp(!inProp)} style={{position:'absolute', zIndex:1000, top: 0, left: 0}}>
      Click
    </button>
    <div className={c.wrapper}>
      {/* <TransitionGroup> */}
      <Transition timeout={{
        appear: 0,
        enter: 0,
        exit: 300,
      }} key='0' in={inProp} unmountOnExit={true}>
        {state => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state],
            ...state !== 'exited',
          }}>
            <AuthEmailChallenge />
          </div>
        )}
      </Transition>

      {/* </TransitionGroup> */}

    </div>
  </div>;
}

export default withStyles(styles)(AuthPage);
