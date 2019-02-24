import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { isLoggedIn } from 'session';

import PanelLayout from '@layouts/PanelLayout';
import withRoot from 'withRoot';
import { Typography, Paper, createStyles, withStyles, ButtonBase } from '@material-ui/core';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

const styles = (theme) => createStyles({
  paper: {
    padding: theme.spacing.unit*3,
    position: 'relative',
  },
  ripple: {
    width: '100%',
    height: '100%',
  },
});

class Panel extends Component {
  state = {  }
  render() {
    if (!isLoggedIn() && location.pathname !== '/auth') {
      // If we’re not logged in, redirect to the home page.
      navigate('/auth');
      return null;
    }

    const { classes: c } = this.props;

    return <PanelLayout>
      <Typography variant='h4' component='h1' paragraph>
        Your Sites
      </Typography>
      <Paper className={c.paper}>
        <ButtonBase className={c.ripple}>
          h
        </ButtonBase>
      </Paper>
    </PanelLayout>;
  }
}

export default withRoot(withStyles(styles)(Panel));
