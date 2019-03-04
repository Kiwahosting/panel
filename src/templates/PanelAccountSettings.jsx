import React, { Component } from 'react';
import {
  withStyles,
  createStyles,
  Typography,
  Paper,
} from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

const styles = (theme) => createStyles({
  paper: {
    position: 'relative',
    padding: theme.spacing.unit * 3,
  },
});

class PanelMainPage extends Component {
  render() {
    const { classes: c } = this.props;

    return <>
      <Typography variant='h4' component='h1' paragraph>
        Account Settings
      </Typography>
      <Paper className={c.paper}>
        <Typography variant='h5' component='div'>
          First Last
        </Typography>
        <Typography variant='body1' component='div'>
          email@example.com
        </Typography>
        <Typography variant='body1' component='div'>
          2 sites and 3 domains.
        </Typography>
      </Paper>
    </>;
  }
}

export default hot(withStyles(styles)(PanelMainPage));
