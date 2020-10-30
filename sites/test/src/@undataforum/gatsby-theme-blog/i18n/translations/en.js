import blog from '../../../../../../microfrontend-blog/src/@undataforum/gatsby-theme-blog/i18n/translations/en';
import news from '../../../../../../microfrontend-news/src/@undataforum/gatsby-theme-blog/i18n/translations/en';

// This shadowed file wins when the entire site is launched.
const en = {
  // Translations for blog.
  ...blog,
  // Translations for news.
  ...news,
};

export default en;