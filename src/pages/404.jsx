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
    <Typography component='h1' variant='h2' align='center'>
      404 Not Found
    </Typography>
    <Typography component='p' variant='body1' align='center'>
      Go to the <Link to='/'>homepage</Link>
    </Typography>
  </MainLayout>;
}

export default withStyles(styles)(Home);
