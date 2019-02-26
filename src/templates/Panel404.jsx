import React, { Component } from 'react';
import { withStyles, createStyles, Typography } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

const styles = (theme) => createStyles({
  paper: {
    padding: theme.spacing.unit * 3,
    position: 'relative',
  },
});

class Panel404 extends Component {
  render() {
    const { classes: c } = this.props;

    return <>
      <Typography variant='h4' component='h1' paragraph>
        404 Not Found
      </Typography>
    </>;
  }
}

export default hot(withStyles(styles)(Panel404));
