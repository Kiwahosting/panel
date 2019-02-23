import React, { Component } from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

const styles = (theme) => createStyles({
  root: {
    fontFamily: 'Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace',
    background: '#CCC',
    padding: theme.spacing.unit * 0.33,
    borderRadius: 4,
    boxDecorationBreak: 'clone',
    WebkitBoxDecorationBreak: 'clone',
    color: '#005',
  },
});

/* Inline Code */
class IC extends Component {
  render() {
    const { classes, children } = this.props;

    return <span className={classes.root}>
      {children}
    </span>;
  }
}

export default hot(withStyles(styles)(IC));
