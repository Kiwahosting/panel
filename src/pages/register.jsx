import React, { Component } from 'react';
import classNames from 'classnames';
import {
  Button,
  Typography,
  withStyles,
  createStyles,
  TextField,
} from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import { validateFullName, validateEmail } from 'utils/validate';
import { Link } from 'components';
import hsimp from 'how-secure-is-my-password/src/hsimp';
import { setEmail, getEmail } from 'utils/global';

hsimp.setNamedNumberDictionary({
  'hundred': 2,
  'thousand': 3,
  'million': 6,
  'billion': 9,
  'trillion': 12,
  'quadrillion': 15,
  'quintillion': 18,
  'sextillion': 21,
  'septillion': 24,
  'octillion': 27,
  'nonillion': 30,
  'decillion': 33,
  'undecillion': 36,
  'duodecillion': 39,
  'tredecillion': 42,
  'quattuordecillion': 45,
  'quindecillion': 48,
  'sexdecillion': 51,
  'septendecillion': 54,
  'octodecillion': 57,
  'novemdecillion': 60,
  'vigintillion': 63,
  'unvigintillion': 66,
  'duovigintillion': 69,
  'tresvigintillion': 72,
  'quattuorvigintillion': 75,
  'quinquavigintillion': 78,
  'sesvigintillion': 81,
  'septemvigintillion': 84,
  'octovigintillion': 87,
  'novemvigintillion': 90,
  'trigintillion': 93,
  'untrigintillion': 96,
  'duotrigintillion': 99,
});

const styles = theme => createStyles({
  root: {
    padding: theme.spacing.unit * 3,
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
  pass_bad: {
    color: amber[700],
  },
  pass_ok: {
    color: green[500],
  },
  pass_good: {
    color: green[500],
  },
  passwordStatus: {
    minHeight: 42,
  },
});

class AuthPage extends Component {
  state = {
    isLoading: false,
    error: false,
    errorString: null,
    name: '',
    mail: '',
    pswd: '',
    pswdConfirm: '',
    passwordTime: null,
    passwordStrength: null,
  }

  handleSubmit = (ev) => {
    this.setState({ isLoading: true });
    ev.preventDefault();
  }

  clearError() {
    if(this.state.loginState === 'denied') {
      this.setState({ loginState: 'initial' });
    }
  }

  handleNameChange = (ev) => {
    this.setState({ name: ev.target.value });
    this.clearError();
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
  handlePswdConfirmChange = (ev) => {
    this.setState({ pswdConfirm: ev.target.value });
    this.clearError();
  }

  mountPassword = (input) => {
    if(input) {
      hsimp({
        outputTime: (time) => {
          this.setState({
            passwordTime: time,
            passwordStrength: (input.className.match(/hsimp-level--([a-z]+)/) || '')[1],
          });
        },
      }, input);
    }
  }

  componentDidMount() {
    this.setState({ mail: getEmail() || '' });
  }

  render() {
    const { classes: c } = this.props;
    let { isLoading, error, errorString, passwordTime, passwordStrength, name, mail } = this.state;

    errorString = error || null;

    let nameError = false;
    if (name.trim() !== '' && !validateFullName(name)) {
      nameError = true;
      if(!errorString) errorString = 'invalid name';
    }

    let emailError = false;
    if (mail.trim() !== '' && !validateEmail(mail)) {
      emailError = true;
      if(!errorString) errorString = 'invalid email';
    }

    return <div className={c.root}>
      <Typography component='h1' variant='h5' align='center'>
        Create an Account
      </Typography>
      <Typography component='p' variant='body1' align='center'>
        for Kiwahosting Panel
      </Typography>
      <Typography component='p' variant='body1'>
        <noscript>Please Enable JavaScript to Sign Up</noscript>
      </Typography>
      <form className={c.form} onSubmit={this.handleSubmit}>
        <TextField
          className={c.input}
          variant='outlined'
          autoComplete='name'
          autoFocus
          label='Full Name'
          error={error || nameError}
          fullWidth
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <TextField
          className={c.input}
          variant='outlined'
          autoComplete='email'
          label='Email Address'
          error={error || emailError}
          fullWidth
          value={this.state.mail}
          onChange={this.handleMailChange}
        />
        <TextField
          className={c.input}
          variant='outlined'
          autoComplete='new-password'
          label='Password'
          type='password'
          error={error}
          fullWidth
          value={this.state.pswd}
          onChange={this.handlePswdChange}
          inputProps={{
            ref: this.mountPassword,
          }}
        />
        <TextField
          className={c.input}
          variant='outlined'
          autoComplete='new-password'
          label='Confirm Password'
          type='password'
          error={error}
          fullWidth
          value={this.state.pswdConfirm}
          onChange={this.handlePswdConfirmChange}
        />
        {
          errorString && (
            <Typography component='p' variant='body2' color='error' className={c.passwordStatus}>
              { errorString }
            </Typography>
          ) || passwordTime && (
            passwordTime === 'Instantly'
              ? <Typography component='p' variant='body2' color='error' className={c.passwordStatus}>
                That password would be cracked instantly by a computer!
              </Typography>
              : (passwordTime === 'Forever' || passwordTime.length > 30
                ? <Typography component='p' variant='body2' className={classNames(
                  c['pass_' + passwordStrength],
                  c.passwordStatus,
                )}
                >
                  That password would take a very long time to crack.
                </Typography>
                : <Typography component='p' variant='body2' className={classNames(
                  c['pass_' + passwordStrength],
                  c.passwordStatus,
                )}
                >
                  That password would take about {passwordTime} to crack.
                </Typography>)
          ) || <div className={c.passwordStatus} />
        }
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={c.submit}
        >
          Create Account
        </Button>
        <div className={c.create}>
          <Link to='/auth'>Sign In</Link>
        </div>
      </form>
    </div>;
  }
}

export default withStyles(styles)(AuthPage);
