import React, { Component } from 'react';
import { navigate } from 'gatsby';

import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: {
    width: '100%',
    maxWidth: 1000,
    margin: 'auto',
  },
  main: {
    width: 'auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up(1000)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down(1000 - theme.spacing.unit * 3 * 2)]: {
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
      <AppBar position='sticky' component='header'>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h6' component='div' color='inherit' className={classes.grow}>
            Kiwahosting Documentation
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        {children}

        <div style={{ height: '40vh' }} />
      </main>
    </>;
  }
}

export default withStyles(styles)(Layout);
