import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import { Heading, Names } from '@undataforum/components';
import { MDXRenderer } from '@undataforum/gatsby-theme-base';

import EventsPage from '../components/events-page';

export const normalize = ({
  id,
  displayType,
  title,
  displayDate,
  duration,
  moderators,
  speakers,
  description,
  registration,
  path,
}) => {
  let profiles = speakers;
  // Add "(Moderator)" after name.
  // Combine moderators and speakers for EventPreview.
  if (moderators) {
    profiles = [
      ...moderators.map(moderator => ({
        ...moderator,
        name: `${moderator.name} (Moderator)`,
      })),
      ...speakers,
    ];
  }
  return {
    id,
    type: displayType,
    title() {
      // title.text is text only with Markdown stripped and quotes and dashes not processed.
      // This allows using an h2 as heading to create a consistent heading hierarchy.
      // Alternatively, we could return <MDXRenderer>{title.childMdx.Body}</MDXRenderer>.
      // This returns a Styled.h1 and messes up the heading hierarchy.
      return (
        <Heading as="h2" sx={{ mb: 3 }}>
          {title.text}
        </Heading>
      );
    },
    date: displayDate,
    duration,
    speakers() {
      return <Names values={profiles.map(({ name }) => name)} mb={3} />;
    },
    description() {
      // Returns processed Markdown wrapped in Styled.p.
      return <MDXRenderer>{description.childMdx.body}</MDXRenderer>;
    },
    links: { page: path, registration },
  };
};

const Events = ({ data, pageContext, location }) => {
  const events = data.allEvent.nodes.map(normalize);
  return (
    <EventsPage
      events={events}
      title={pageContext.title}
      description={pageContext.description}
      location={location}
    />
  );
};

Events.propTypes = {
  data: shape({ allEvent: object.isRequired }).isRequired,
  pageContext: shape({
    title: string.isRequired,
    description: string,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Events;

export const fragment = graphql`
  fragment Event on Event {
    id
    displayType
    title {
      text
    }
    startDate
    endDate
    displayDate
    duration
    moderators {
      name
    }
    speakers {
      name
    }
    description {
      childMdx {
        body
      }
      text
    }
    registration
    path
  }
`;

export const query = graphql`
  query($type: String!) {
    allEvent(
      sort: { fields: startDate, order: DESC }
      filter: { type: { eq: $type } }
    ) {
      nodes {
        ...Event
      }
    }
  }
`;
