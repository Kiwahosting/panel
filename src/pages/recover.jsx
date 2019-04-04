import React, { Component } from 'react';
import {
  Button,
  Typography,
  withStyles,
  createStyles,
  TextField,
} from '@material-ui/core';
import { getEmail, setEmail } from 'utils/global';
import { Link } from 'components';
import { lang } from 'utils/language';

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
  noscript: {
    
  },
});

class AuthPage extends Component {
  state = {
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
    const { error } = this.state;

    return <div className={c.root}>
      <Typography component='h1' variant='h5' align='center'>
        {lang('auth.recover.header')}
      </Typography>
      <Typography component='p' variant='body1' align='center'>
        {lang('auth.recover.subheader')}
      </Typography>
      {
        typeof document === 'undefined'
        && <Typography variant='body1' className={c.noscript} color='error'>
          <noscript>{lang('noscript.recover')}</noscript>
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
              label={lang('auth.form.email')}
              error={error}
              fullWidth
              value={this.state.mail}
              onChange={this.handleMailChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={c.submit}
            >
              {lang('auth.form.submit.recover')}
            </Button>
            <div className={c.create}>
              <Link to='/auth'>{lang('auth.link.signin')}</Link>
            </div>
          </form>
      }
    </div>;
  }
}

export default withStyles(styles)(AuthPage);
