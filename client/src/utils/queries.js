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
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      usertitle
      city
      state
      profileimg
      followerCount
      followers {
        _id
        username
      }
      builds {
        _id
        buildDescription
        createdAt
        username
        manufacturer
        model
        year
        img
        commentCount
        comments {
          _id
          createdAt
          username
          commentBody
        }
      }
    }
  }

`;