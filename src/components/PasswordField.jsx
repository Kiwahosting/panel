import { InputAdornment, withStyles, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Eye from '@material-ui/icons/RemoveRedEye';
import EyeOff from './EyeOff.jsx';
import React, { Component } from 'react';

const styles = () => ({
  eye: {
    cursor: 'pointer',
  },
  input: {
    paddingRight: '4px',
  },
});

class PasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordIsMasked: true,
    };
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  render() {
    const { classes, ...rest } = this.props;
    const { passwordIsMasked } = this.state;

    const ButtonIcon = passwordIsMasked ? EyeOff : Eye;

    return (
      <TextField
        type={passwordIsMasked ? 'password' : 'text'}
        {...rest}
        InputProps={{
          className: classes.input,
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={this.togglePasswordMask}
              >
                <ButtonIcon
                  className={classes.eye}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

export default withStyles(styles)(PasswordInput);
