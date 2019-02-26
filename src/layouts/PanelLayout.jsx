import React, { Component } from 'react';
import { navigate, Link } from 'gatsby';

import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  List,
  Divider,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountIcon from '@material-ui/icons/AccountCircle';

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
  state = {
    drawerOpen: false,
  }
  handleBack = () => {
    navigate('/');
  }

  onDrawerOpen = () => this.setState({ drawerOpen: true });
  onDrawerClose = () => this.setState({ drawerOpen: false });
  render() {
    const { classes, children } = this.props;
    const nav = [
      ['Home', HomeIcon, '/panel'],
      ['Account Settings', AccountIcon, '/panel/account'],
      ['divider'],
      ['Explode Lmao', AccountIcon, '/auth'],
    ];
    return <>
      <SwipeableDrawer
        open={this.state.drawerOpen}
        onClose={this.onDrawerClose}
        onOpen={this.onDrawerOpen}
      >
        <AppBar position='sticky' component='header' color='secondary'>
          <Toolbar className={classes.toolbar}>
            <Typography variant='h6' component='div' color='inherit' className={classes.grow}>
              Kiwahosting Panel
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {
            nav.map(([name, Icon, url], i) => {
              if (name === 'divider') {
                return <Divider
                  key={i}
                  variant='middle'
                />;
              }
              return <ListItem
                button
                component={Link}
                to={url}
                onClick={this.onDrawerClose}
                key={url}
              >
                <ListItemIcon><Icon /></ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>;

            })
          }
        </List>
      </SwipeableDrawer>

      <AppBar position='sticky' component='header'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            color='inherit'
            aria-label='Menu'
            onClick={this.onDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
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
