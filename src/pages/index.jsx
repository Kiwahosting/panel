import React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import withRoot from 'withRoot';

import MainLayout from '@layouts/MainLayout';
import { SEO, Link } from '@components';

// eslint-disable-next-line no-unused-vars
const styles = (theme) => ({

});

function Home(props) {
  const { classes } = props;

  return <MainLayout {...props}>
    <SEO title='Kiwahosting' isRoot />
    <Typography component='h1' variant='h2'>
      Kiwahosting
    </Typography>
    <Typography component='p' variant='h6' paragraph>
      Coming Soon!
    </Typography>
    <Typography component='p' variant='body1'>
      <Link to='/auth'>Log In</Link>
    </Typography>

  </MainLayout>;
}

export default withRoot(withStyles(styles)(Home));
