import React, { Component } from 'react';
import {
  Avatar,
  Button,
  Typography,
  withStyles,
  createStyles,
  TextField,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import AuthLayout from 'layouts/AuthLayout';
import { Link } from 'components';

const styles = theme => createStyles({
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 3,
  },
  submit: {
    marginTop: theme.spacing.unit * 1,
  },
  input: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1,
  },
  recover: {
    marginTop: theme.spacing.unit * 0.5,
    opacity: 0.7,
  },
  create: {
    marginTop: theme.spacing.unit * 2,
    opacity: 0.7,
  },
  noscript: {
    
  },
});

class AuthPage extends Component {
  state = {
    isLoading: false,
    loginState: 'initial', // initial, denied
    error: false,
    mail: '',
    pswd: '',
  }

  handleSubmit = (ev) => {
    this.setState({ isLoading: true });
    ev.preventDefault();

    // TODO: Use real server
    setTimeout(() => {
      this.setState({ loginState: 'denied', isLoading: false });
    }, 700);
  }

  clearError() {
    if(this.state.loginState === 'denied') {
      this.setState({ loginState: 'initial', error: false });
    }
  }

  handleMailChange = (ev) => {
    this.setState({ mail: ev.target.value });
    this.clearError();
  }

  handlePswdChange = (ev) => {
    this.setState({ pswd: ev.target.value });
    this.clearError();
  }

  render() {
    const { classes: c } = this.props;
    const { isLoading, loginState, error } = this.state;

    return <AuthLayout loading={isLoading}>
      <Avatar className={c.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Recover your Password
      </Typography>
      <Typography component='p' variant='body1'>
        for Kiwahosting Panel
      </Typography>
      {
        // typeof document === 'undefined'
        // && <Typography variant='body1' className={c.noscript} color='error'>
        //   <noscript>Please Enable JavaScript</noscript>
        // </Typography>
      }
      {
        typeof document !== 'undefined'
          && <form className={c.form} onSubmit={this.handleSubmit}>
            <TextField
              className={c.input}
              variant='outlined'
              autoComplete='email'
              autoFocus
              label='Email Address'
              error={error}
              fullWidth
              value={this.state.mail}
              onChange={this.handleMailChange}
            />
            {
              loginState === 'denied'
                && <Typography component='p' variant='body1' color='error'>
                  Incorrect Username or Password
                </Typography>
            }
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={c.submit}
            >
              Reset Password
            </Button>
            <div className={c.create}>
              <Link to='/auth'>Sign In</Link>
            </div>
          </form>
      }
    </AuthLayout>;
  }
}

import withRoot from 'withRoot';
export default withRoot(withStyles(styles)(AuthPage));
