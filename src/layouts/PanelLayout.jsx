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
      <AppBar position='sticky' component='header'>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h6' component='div' color='inherit' className={classes.grow}>
            Kiwahosting Panel
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        {children}
      </main>
    </>;
  }
}

export default withStyles(styles)(Layout);