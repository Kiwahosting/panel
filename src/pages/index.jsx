import React from 'react';
import { withStyles, Typography } from '@material-ui/core';

import MainLayout from 'layouts/MainLayout';
import { SEO, Link } from 'components';

// eslint-disable-next-line no-unused-vars
const styles = (theme) => ({

});

function Home(props) {
  const { classes: c } = props;

  return <MainLayout {...props}>
    <SEO title='Kiwahosting' isRoot />
    <Typography component='h1' variant='h2'>
      Kiwahosting
    </Typography>
    <Typography component='p' variant='h6' paragraph>
      Coming Soon!
    </Typography>
    <Typography component='p' variant='body1'>
      <Link to='/sign-in'>Log In</Link>
    </Typography>

  </MainLayout>;
}

export default withStyles(styles)(Home);
