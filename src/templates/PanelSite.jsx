import React, { Component } from 'react';
import {
  withStyles,
  createStyles,
  Typography,
  Paper,
  Button,
} from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

import PanelLayout from 'layouts/PanelLayout';

const styles = (theme) => createStyles({
  paper: {
    position: 'relative',
    padding: theme.spacing.unit * 3,
  },
});

class PanelMainPage extends Component {
  render() {
    const { classes: c, siteId } = this.props;

    return <>
      <Typography variant='h4' component='h1' paragraph>
        Manage Site {siteId}
      </Typography>
      <Paper className={c.paper}>
        <Button
          variant='contained'
          color='secondary'
        >Delete Site</Button>
      </Paper>
    </>;
  }
}

export default hot(withStyles(styles)(PanelMainPage));
