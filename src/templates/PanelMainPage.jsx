import React, { Component } from 'react';
import { withStyles, createStyles, Typography, Paper, ButtonBase } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

const styles = (theme) => createStyles({
  paper: {
    padding: theme.spacing.unit * 3,
    position: 'relative',
  },
});

class PanelMainPage extends Component {
  render() {
    const { classes: c } = this.props;

    return <>
      <Typography variant='h4' component='h1' paragraph>
        Your Sites
      </Typography>
      <Paper className={c.paper}>
      </Paper>
    </>;
  }
}

export default hot(withStyles(styles)(PanelMainPage));
