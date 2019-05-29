import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query siteMetadata {
        site {
          siteMetadata {
            title
            description
            siteUrl
            navigation {
              links {
                href
                text
              }
              button {
                href
                text
              }
            }
          }
        }
      }
    `
  );
  return siteMetadata;
};

export default useSiteMetadata;