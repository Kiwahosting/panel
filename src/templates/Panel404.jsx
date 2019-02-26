import React, { Component } from 'react';
import { withStyles, createStyles, Typography } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { Link } from 'components';
import PanelLayout from 'layouts/PanelLayout';

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
      <Typography variant='body1' component='p' paragraph>
        That page of the Panel was not found. <Link to='/panel'>Return to Main Page</Link>
      </Typography>
    </>;
  }
}

export default hot(withStyles(styles)(Panel404));
