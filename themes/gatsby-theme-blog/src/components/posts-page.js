import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import { Container, Grid, PostPreview } from '@undataforum/components';
import { Layout, Styled } from '@undataforum/gatsby-theme-base';

const PostsPage = ({ posts, title, description, location }) => (
  <Layout location={location} title={title} description={description}>
    <Container maxWidth="narrow">
      <Styled.h1>{title}</Styled.h1>
      <Grid gap={4}>
        {posts.map(({ id, ...post }) => (
          <PostPreview post={{ ...post }} key={id} fontSize={[3, 4]} />
        ))}
      </Grid>
    </Container>
  </Layout>
);

PostsPage.propTypes = {
  posts: arrayOf(
    shape({
      id: string.isRequired,
      title: string.isRequired,
      authors: func.isRequired,
      date: string.isRequired,
      description: string.isRequired,
      href: string.isRequired,
    })
  ).isRequired,
  title: string.isRequired,
  description: string,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default PostsPage;
