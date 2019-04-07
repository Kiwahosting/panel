import React, { Component } from 'react';
import {
  Button,
  Typography,
  withStyles,
  createStyles,
  TextField,
} from '@material-ui/core';
import { getEmail, setEmail, setLoading } from 'utils/global';
import { Link } from 'components';
import { lang } from 'utils/language';
import { emailExists } from 'api';

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

  handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    if (await emailExists({ email: this.state.mail, password: this.state.pswd })) {
      // 
    } else {
      this.setState({ loginState: 'denied', error: true, isLoading: false });
    }
    setLoading(false);
  }

  clearError() {
    if (this.state.loginState === 'denied') {
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

    return <>
      <Typography component='h1' variant='h5' align='center'>
        lmao whats ur password
      </Typography>
      <Typography component='p' variant='body1' align='center'>
        for the stuff
      </Typography>
      <form className={c.form} onSubmit={this.handleSubmit}>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={c.submit}
          disabled={mail.trim() === '' || error || loginState === 'denied'}
        >
          {lang('auth.form.submit.signin')}
        </Button>
        <div className={c.recover}>
          <Link to='/recover'>{lang('auth.link.recover')}</Link>
        </div>
      </form>
    </>;
  }
}

export default withStyles(styles)(AuthPage);
