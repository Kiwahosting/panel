import React, { Component } from 'react';
import { navigate } from 'gatsby';

import {
  withStyles,
  createStyles,
} from '@material-ui/core';

const styles = theme => createStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: {
    width: '100%',
    maxWidth: 800,
    margin: 'auto',
  },
  main: {
    width: 'auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down(600)]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
});

class Layout extends Component {
  state = {  }
  handleBack = () => {
    navigate('/');
  }
  render() {
    const { classes, children } = this.props;
    return <>
      <main className={classes.main}>
        {children}

        <div style={{ height: '40vh' }} />
      </main>
    </>;
  }
}

export default withStyles(styles)(Layout);
