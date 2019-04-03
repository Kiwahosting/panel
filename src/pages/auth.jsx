import React, { Component } from 'react';
import { login, isLoggedIn } from 'api';
import { navigate } from 'gatsby';
import {
  Button,
  Typography,
  withStyles,
  createStyles,
  TextField,
} from '@material-ui/core';
import { getEmail, setEmail, setLoading } from 'utils/global';
import { Link } from 'components';

const styles = theme => createStyles({
  container: {
    padding: theme.spacing.unit * 3,
    width: '100%',
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
});

class AuthPage extends Component {
  state = {
    isLoading: false,
    loginState: 'initial', // initial, denied
    error: false,
    mail: '',
    pswd: '',
  }

  handleSubmit = async(ev) => {
    ev.preventDefault();
    setLoading(true);

    if(await login({ email: this.state.mail, password: this.state.pswd })) {
      navigate(
        (location.hash && location.hash.length > 0 && location.hash.replace(/^#/, '')) || '/panel'
      );
    } else {
      this.setState({ loginState: 'denied', error: true, isLoading: false });
    }
    setLoading(false);
  }

  clearError() {
    if(this.state.loginState === 'denied') {
      this.setState({ loginState: 'initial', error: false });
    }
  }

  handleMailChange = (ev) => {
    this.setState({ mail: ev.target.value });
    setEmail(ev.target.value);
    this.clearError();
  }

  handlePswdChange = (ev) => {
    this.setState({ pswd: ev.target.value });
    this.clearError();
  }

  componentDidMount() {
    this.setState({ mail: getEmail() || '' });
  }

  render() {
    const { classes: c } = this.props;
    const { loginState, error, mail } = this.state;

    if (isLoggedIn()) {
      // If we’re logged in, redirect to the panel.
      setTimeout(() => {
        navigate('/panel');
      }, 100);
      return null;
    }

    return <div className={c.container}>
      <Typography component='h1' variant='h5' align='center'>
        Sign in
      </Typography>
      <Typography component='p' variant='body1' align='center'>
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
            {
              loginState === 'denied'
                && <Typography component='p' variant='body1' color='error'>
              This account doesn't exist.
                </Typography>
                || <Typography component='p' variant='body1' color='error' aria-hidden='true'>
                  &nbsp;
                </Typography>
            }
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={c.submit}
              disabled={mail.trim() === '' || error || loginState === 'denied'}
            >
              Sign in
            </Button>
            <div className={c.create}>
              <Link to='/register'>Create Account</Link>
            </div>
            <div className={c.recover}>
              <Link to='/recover'>Reset Password</Link>
            </div>
          </form>
      }
    </div>;
  }
}

export default withStyles(styles)(AuthPage);
