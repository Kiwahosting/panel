import React from 'react';
import { CircularProgress, withStyles, createStyles } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames';

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

function LoadingScreen(props) {
  return <div
    {...props}
    classes={undefined}
    className={classNames(props.classes.root, props.className)}
  >
    <CircularProgress />
  </div>;
}

export default hot(withStyles(styles)(LoadingScreen));
