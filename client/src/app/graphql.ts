import gql from 'graphql-tag';

export const titlesQuery = gql`
  query TitlesQuery {
    documents {
      title
    }
  }
`;
