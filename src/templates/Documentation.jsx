import React from 'react';
import { graphql } from 'gatsby';
import convert from 'htmr';

import {
  withStyles,
  createStyles,
  Typography,
} from '@material-ui/core';

import DocsLayout from 'layouts/DocsLayout';
import Link from 'components/Link';
import IC from 'components/IC';

// eslint-disable-next-line no-unused-vars
const styles = (theme) => createStyles({
  para: {
    'li > &': {
      marginBottom: 0,
    },
  },
});

let c;

const transform = {
  h1: (props) => <Typography variant='h3' paragraph component='h1' {...props} />,
  h2: (props) => <Typography variant='h4' paragraph component='h2' {...props} />,
  h3: (props) => <Typography variant='h5' paragraph component='h3' {...props} />,
  p: (props) => <Typography variant='body1' paragraph component='p' {...props} className={c.para} />,
  a: (props) => <Link
    {...props}
    to={
      props.href.endsWith('.md')
        ? '/docs' + props.href.substring(0, props.href.length - 3)
        : props.href
    }
    href={undefined}
  />,
  // ul: (props) => <ul {...props} style={{ marginTop: 0 }}/>,
  // ol: (props) => <ol {...props} style={{ marginTop: 0 }}/>,
  li: (props) => <Typography variant='body1' component='span'><li {...props} /></Typography>,
  code: IC,
};

function Documentation(props) {
  const { data: { markdownRemark: page }, classes, ...rest } = props;
  c = classes;

  return <DocsLayout {...rest}>
    {convert(page.html, {
      transform,
    })}
  </DocsLayout>;
}

export default withStyles(styles)(Documentation);

export const pageQuery = graphql`
  query PageByPath($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
    }
  }
`;
