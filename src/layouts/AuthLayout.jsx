import React, { Component } from 'react';
import {
  withStyles,
  createStyles,
  Typography,
  LinearProgress,
  Paper,
} from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => createStyles({
  main: {
    position: 'relative',
    width: 'auto',
    display: 'flex', // Fix IE 11 issue.
    minHeight: '100vh',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  copyright: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  progress: {
    width: '100%',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  topSpacer: {
    marginBottom: theme.spacing.unit * 2,
  },
  paperLoading: {
    background: '#E6E6E6',
    pointerEvents: 'none',
    userSelect: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentLoading: {
    filter: 'brightness(0.90)',
  },
});

class AuthLayout extends Component {
  state = {}
  render() {
    const { classes: c, children, loading } = this.props;

    return (
      <main className={c.main}>
        <Paper className={classNames(c.paper, {
          [c.paperLoading]: loading,
        })}>
          { loading && <LinearProgress className={c.progress} /> }
          <div className={c.topSpacer} />
          <div className={classNames({
            [c.contentLoading]: loading,
            [c.content]: true,
          })}>
            { children }
          </div>
        </Paper>
        <Typography variant='caption' className={c.copyright}>
          Copyright 2019 Kiwahosting
        </Typography>
      </main>
    );
  }
}

export default withStyles(styles)(AuthLayout);
