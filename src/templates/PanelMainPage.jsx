import React, { Component } from 'react';
import {
  withStyles,
  createStyles,
  Typography,
  Paper,
  ButtonBase,
} from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { navigate } from 'gatsby';

const styles = (theme) => createStyles({
  paper: {
    minHeight: '100px',
  },
});

const stylesButton = (theme) => createStyles({
  root: {
    padding: theme.spacing.unit * 3,
    width: '100%',
    display: 'block',
    textAlign: 'left',
  },
  description: {
    opacity: 0.4,
  },
});

const SiteButton = withStyles(stylesButton, {name:'SiteButton'})(
  ({ classes: c, site: { name, description } }) => {
    return <ButtonBase
      className={c.root}
      onClick={() => navigate('/panel/' + name)}
    >
      <Typography variant='h5' component='h2'>
        {name}
      </Typography>
      <Typography variant='body1' component='p' className={c.description}>
        {description}
      </Typography>
    </ButtonBase>;
  });

class PanelMainPage extends Component {
  render() {
    const { classes: c } = this.props;

    return <>
      <Typography variant='h4' component='h1' paragraph>
        Your Sites
      </Typography>
      <Paper className={c.paper}>
        <SiteButton site={{
          id: '1234',
          name: 'filipkin.com',
          description: 'magic',
        }} />
        <SiteButton site={{
          name: 'davecode.me',
          description: 'description etc',
        }} />
      </Paper>
    </>;
  }
}

export default hot(withStyles(styles)(PanelMainPage));
