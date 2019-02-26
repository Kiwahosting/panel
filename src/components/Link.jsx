import React from 'react';
import { Link as MUILink } from '@material-ui/core';
import { Link as GLink } from 'gatsby';

function Link(props) {
  const to = props.to || '#';
  if (to.startsWith('http://') || to.startsWith('https://')) {
    return <MUILink component='a' href={to} variant='body1' color='secondary' {...props} />;
  } else {
    return <MUILink component={GLink} to={to} variant='body1' color='secondary' {...props} />;
  }
}

export default Link;
