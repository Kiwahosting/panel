import React, { Component } from 'react';
import {
  Button,
  Typography,
  withStyles,
  createStyles,
} from '@material-ui/core';
import { setLoading } from 'utils/global';
import { Link } from 'components';
import { lang } from 'utils/language';
import { uselessDelay } from 'api';
import PasswordField from 'components/PasswordField';

const styles = theme => createStyles({
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
  link: {
    marginTop: theme.spacing.unit * 2,
    opacity: 0.7,
  },
});

class AuthPage extends Component {
  state = {
    password: '',
    loginState: 'initial', // initial, denied
    error: false,
  }

  handlePasswordChange = (ev) => {
    this.clearError();
    this.setState({ password: ev.target.value });
  }

  handleSubmit = async(ev) => {
    ev.preventDefault();
    setLoading(true);

    await uselessDelay(600);

    await this.setState({ loginState: 'denied', error: true });

    setLoading(false);
  }

  clearError() {
    if (this.state.loginState === 'denied') {
      this.setState({ loginState: 'initial', error: false });
    }
  }
  
  render() {
    const { classes: c } = this.props;
    const { loginState, error } = this.state;

    return <>
      <Typography component='h1' variant='h5' align='center'>
        {lang('auth.signin.password.header')}
      </Typography>
      <Typography component='p' variant='body1' align='center'>
        {lang('auth.signin.password.subheader')}
      </Typography>
      <form className={c.form} onSubmit={this.handleSubmit}>
        <PasswordField
          className={c.input}
          variant='outlined'
          autoComplete='current-password'
          autoFocus
          label={lang('auth.form.password')}
          error={error}
          fullWidth
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        {
          loginState === 'denied'
          && <Typography component='p' variant='body1' color='error'>
            {lang('auth.error.password-invalid')}
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
        >
          {lang('auth.form.submit.continue')}
        </Button>
        <div className={c.link}>
          <Link to='/recover'>{lang('auth.link.recover')}</Link>
        </div>
      </form>
    </>;
  }
}

export default withStyles(styles)(AuthPage);
