import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import withRoot from 'withRoot';
import { TextField } from '@material-ui/core';
import { Link } from '@components';
import AuthLayout from '@layouts/AuthLayout';

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
    lineHeight: '328px', // this is calculated on marginTop and height of the `form` element
    height: '328px',
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
        Sign in
      </Typography>
      <Typography component='p' variant='body1'>
        to Kiwahosting Panel
      </Typography>
      {
        typeof document === 'undefined'
        && <Typography variant='body1' className={c.noscript} color='error'>
          <noscript>Please Enable JavaScript to Sign In</noscript>
        </Typography>
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
            <TextField
              className={c.input}
              variant='outlined'
              autoComplete='current-password'
              label='Password'
              type='password'
              error={error}
              fullWidth
              value={this.state.pswd}
              onChange={this.handlePswdChange}
            />
            {
              loginState === 'denied'
                && <Typography component='p' variant='body1' color='error'>
                  Incorrect Username or Password
                </Typography>
            }
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={c.submit}
            >
              Sign in
            </Button>
            <div className={c.create}>
              <Link to='/register'>Don't Have an Account?</Link>
            </div>
            <div className={c.recover}>
              <Link to='/recover'>Recover Account</Link>
            </div>
          </form>
      }
    </AuthLayout>;
  }
}

export default withRoot(withStyles(styles)(AuthPage));
