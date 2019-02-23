import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import withRoot from 'withRoot';
import { graphql } from 'gatsby';
import convert from 'htmr';

import DocsLayout from '@layouts/DocsLayout';
import { Typography } from '@material-ui/core';
import { Link } from '@components';

// eslint-disable-next-line no-unused-vars
const styles = (theme) => ({

});

const transform = {
  h1: (props) => <Typography variant='h3' paragraph component='h1' {...props} />,
  h2: (props) => <Typography variant='h4' paragraph component='h2' {...props} />,
  h3: (props) => <Typography variant='h5' paragraph component='h3' {...props} />,
  p: (props) => <Typography variant='body1' paragraph component='p' {...props} />,
  a: (props) => <Link
    {...props}
    to={props.href.endsWith('.md') ? '/docs' + props.href.substring(0, props.href.length - 3) : props.href}
    href={undefined}
  />,
};

function Documentation(props) {
  const { data: { markdownRemark: page } } = props;

  return <DocsLayout {...props}>
    {convert(page.html, {
      transform,
    })}
  </DocsLayout>;
}

export default withRoot(withStyles(styles)(Documentation));

export const pageQuery = graphql`
  query PageByPath($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
    }
  }
`;
