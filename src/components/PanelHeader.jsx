import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';
import clsx from 'clsx';
import { PanelStateContext } from 'layouts/PanelLayout';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing.unit,
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  root: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    transition: 'box-shadow 0.2s',
  },
  shadow: {
    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
  },
});

function Header(props) {
  const { classes, title, tabs, bare } = props;

  return <PanelStateContext.Consumer>
    {({ headerShadow, setDrawer }) => {
      return <div className={clsx(classes.root, headerShadow && classes.shadow)}>
        <AppBar color='primary' position='static' elevation={0}>
          <Toolbar>
            <Grid container spacing={8} alignItems='center'>
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color='inherit'
                    aria-label='Open drawer'
                    onClick={() => setDrawer(true)}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item xs />
              <Grid item>
                <Typography className={classes.link} component={Link} to='/docs'>
                Go to docs
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Alerts'>
                  <IconButton color='inherit'>
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <IconButton color='inherit' className={classes.iconButtonAvatar}>
                  <Avatar className={classes.avatar} src='/static/images/avatar/1.jpg' />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {!bare && <AppBar
          component='div'
          className={classes.secondaryBar}
          color='primary'
          position='static'
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems='center' spacing={8}>
              <Grid item xs>
                <Typography color='inherit' variant='h5'>
                  {title}
                </Typography>
              </Grid>
              <Grid item>
                <Button className={classes.button} variant='outlined' color='inherit' size='small'>
                Web setup
                </Button>
              </Grid>
              <Grid item>
                <Tooltip title='Help'>
                  <IconButton color='inherit'>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>}
        {!bare && <AppBar
          component='div'
          className={classes.secondaryBar}
          color='primary'
          position='static'
          elevation={0}
        >
          <Tabs value={0} textColor='inherit'>
            {
              tabs.map(tab => {
                return <Tab key={tab.id} textColor='inherit' label={tab.id} />;
              })
            }
          </Tabs>
        </AppBar>}
      </div>;
    }}
  </PanelStateContext.Consumer>;
}

Header.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
