import React, { Component } from 'react';
import {
  withStyles,
  createStyles,
  Typography,
  Paper,
  Button,
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
        <Button
          variant='contained'
          color='secondary'
        >Delete Account</Button>
      </Paper>
    </>;
  }
}

export default hot(withStyles(styles)(PanelMainPage));
