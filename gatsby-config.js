module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-hidenames',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/layouts/RootLayout.jsx'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/docs`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [

        ],
      },
    },
  ],
};
