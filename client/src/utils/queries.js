import { gql } from '@apollo/client';

export const QUERY_BUILDS = gql`
  query builds($username: String) {
    builds(username: $username) {
      _id
      buildDescription
      createdAt
      username
      manufacturer
      model
      year
      img
      commentCount
    }
  }
`;