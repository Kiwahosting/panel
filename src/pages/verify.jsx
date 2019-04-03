import React, { Component } from 'react';
import {
  Typography,
  withStyles,
  createStyles,
  CircularProgress,
} from '@material-ui/core';

const styles = theme => createStyles({
  container: {
    padding: theme.spacing.unit * 3,
    width: '100%',
  },
  spacer: {
    height: '15px',
  },
  progress: {
    margin: 'auto',
    display: 'block',
  },
});

class AuthPage extends Component {
  render() {
    const { classes: c, location } = this.props;
    
    return <div className={c.container}>
      <Typography component='h1' variant='h6' align='center'>
        Verifying Your Email
      </Typography>
      <Typography component='p' variant='body1' align='center' paragraph>
        Please wait one moment.
      </Typography>
      <div className={c.spacer}></div>
      <CircularProgress className={c.progress}/>
      <div className={c.spacer}></div>
    </div>;
  }
}

export default withStyles(styles)(AuthPage);
