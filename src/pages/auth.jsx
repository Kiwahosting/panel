import React, { useState, useEffect, useLayoutEffect } from 'react';
import { isLoggedIn } from 'api';
import { navigate } from 'gatsby';
import {
  withStyles,
  createStyles,
} from '@material-ui/core';
import AuthEmailChallenge from 'templates/auth/AuthEmailChallenge';
import { TransitionGroup, Transition } from 'react-transition-group';
import AuthPasswordChallenge from 'templates/auth/AuthPasswordChallenge';

const styles = theme => createStyles({
  container: {
    position: 'relative',
    padding: theme.spacing.unit * 3,
    width: '100%',
  },
});

function AuthPage(props) {
  const { classes: c, location } = props;
  const [init, setInit] = useState(false);

  if (isLoggedIn()) {
    // If we’re logged in, redirect to the panel.
    setTimeout(() => {
      navigate('/panel');
    }, 100);
    return null;
  }
  
  let Challenge = () => {};
  if (location.pathname === '/auth/') {
    Challenge = AuthEmailChallenge;
  }
  if (location.pathname === '/auth/password') {
    Challenge = AuthPasswordChallenge;
  }

  return <div className={c.container}>
    <Challenge setChallenge={(x) => navigate('/auth/' + x)}/>
  </div>;
}

export default withStyles(styles)(AuthPage);
