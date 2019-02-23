import React from 'react';
import { CircularProgress, withStyles, createStyles } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

const styles = createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexGrow: 1,
  },
  inner: {
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

function LoadingScreen({ classes }) {
  return <div className={classes.root}>
    <CircularProgress />
  </div>;
}

export default hot(withStyles(styles)(LoadingScreen));
