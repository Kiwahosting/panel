import React from 'react';
import Helmet from 'react-helmet';

function SEO({ description, lang, meta, title, isRoot }) {
  const metaTitle = 'Kiwahosting';
  const metaDescription = 'Kiwahosting Description';
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={
        isRoot
          ? metaTitle
          : `%s | ${metaTitle}`
      }
      meta={[
        {
          name: 'description',
          content: description | metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description | metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ]
        .concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

export default SEO;

