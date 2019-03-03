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
  createStyles,
  ClickAwayListener,
  Paper,
  Popover,
  Badge,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationIcon from '@material-ui/icons/Notifications';
import { logout, getNotifications } from 'api';

const styles = theme => createStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
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
  notificationWindow: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  notificationTitle: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1,
    textAlign: 'center',
  },
});

class Layout extends Component {
  state = {
    drawerOpen: false,
    notifOpen: false,
    notifications: null,
  }

  componentDidMount() {
    getNotifications().then(notifications => {
      this.setState({ notifications });
    });
  }

  handleBack = () => {
    navigate('/');
  }

  onDrawerOpen = () => this.setState({ drawerOpen: true });
  onDrawerClose = () => this.setState({ drawerOpen: false });

  handleLogout = async() => {
    await logout();
    navigate('/');
  }

  handleNotifOpen = () => {
    if (!this.state.notifications) return;
    this.setState({ notifOpen: true });
  };

  handleClickAway = () => {
    this.setState({ notifOpen: false });
  };

  render() {
    const { classes: c, children } = this.props;
    const { notifOpen, notifications } = this.state;
    // Navigation, where each item in array is a list item, in the format
    //   [Label, Icon, OnClick]
    //      OnClick can be a url string, or function callback
    //      which can return true to prevent closing of the
    //      drawer box.
    //   or ['divider']
    //      which creates a divider

    const nav = [
      ['Home', HomeIcon, '/panel'],
      ['Account Settings', AccountIcon, '/panel/account'],
      ['divider'],
      ['Log Out', ExitToAppIcon, this.handleLogout],
    ];

    return <div className={c.root}>
      <SwipeableDrawer
        open={this.state.drawerOpen}
        onClose={this.onDrawerClose}
        onOpen={this.onDrawerOpen}
      >
        <AppBar position='sticky' component='header' color='secondary'>
          <Toolbar className={c.toolbar}>
            <Typography variant='h6' component='div' color='inherit' className={c.grow}>
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
              if(typeof url === 'function') {
                return <ListItem
                  button
                  onClick={() => {
                    // if callback returns something, skip closing
                    if(url() === undefined) {
                      this.onDrawerClose();
                    }
                  }}
                  key={url}
                >
                  <ListItemIcon><Icon /></ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>;
              } else {
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
              }
            })
          }
        </List>
      </SwipeableDrawer>

      <AppBar position='sticky' component='header'>
        <Toolbar className={c.toolbar}>
          <IconButton
            className={c.menuButton}
            color='inherit'
            aria-label='Menu'
            onClick={this.onDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' color='inherit' className={c.grow}>
            Kiwahosting Panel
          </Typography>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup='true'
            onClick={this.handleNotifOpen}
            buttonRef={node => this.notifElem = node}
            color='inherit'
          >
            <Badge badgeContent={notifications && notifications.length || 0} color='secondary'>
              <NotificationIcon />
            </Badge>
          </IconButton>
          {this.notifElem &&
            <Popover
              open={notifOpen}
              anchorEl={this.notifElem}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
            >
              <ClickAwayListener onClickAway={this.handleClickAway}>
                <Paper
                  className={c.notificationWindow}
                >
                  <Typography variant='h6' className={c.notificationTitle} component='div'>
                    Notifications
                  </Typography>
                  {
                    notifications && notifications.map((item, i) => {
                      return <ListItem button key={i} component={Link} to={item.url}>
                        <ListItemText primary={item.text} />
                      </ListItem>;
                    })
                  }
                </Paper>
              </ClickAwayListener>
            </Popover>
          }
        </Toolbar>
      </AppBar>

      <main className={c.main}>
        {children}
      </main>
    </div>;
  }
}

export default withStyles(styles)(Layout);
