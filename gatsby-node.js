const path = require('path');

exports.onCreateWebpackConfig = function ({ getConfig }) {
  const config = getConfig();

  config.resolve.alias['@components'] = path.join(__dirname, 'src/components');
  config.resolve.alias['@layouts'] = path.join(__dirname, 'src/layouts');
  config.resolve.alias['withRoot'] = path.join(__dirname, 'src/withRoot.js');

};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const template = path.resolve('src/templates/Documentation.jsx');

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `
  ).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `${node.fields.slug}`,
        component: template,
        context: {}, // additional data can be passed via context
      });
    });
  });
};

const { createFilePath } = require('gatsby-source-filesystem');
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    let slug = '/docs' + createFilePath({ node, getNode, basePath: 'docs' }).toLowerCase();
    if (path.basename(slug) === 'readme') {
      slug = path.dirname(slug);
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};
