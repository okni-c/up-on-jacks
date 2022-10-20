import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FOLLOWER = gql`
  mutation addFollower($id: ID!) {
    addFollower(followerId: $id) {
      _id
      username
      followerCount
      followers {
        _id
        username
      }
    }
  }
`;

export const MOD_BUILD = gql`
  mutation modifyBuild(
    $buildId: ID!,
    $buildDescription: String,
    $manufacturer: String,
    $model: String,
    $year: String,
    $mods: [ModInput],
    $buildimages: [ImageInput]
    ) {
    modifyBuild(
      buildId: $buildId,
      buildDescription: $buildDescription,
      manufacturer: $manufacturer,
      model: $model,
      year: $year,
      mods: $mods,
      buildimages: $buildimages
      ) {
      _id
      buildDescription
      manufacturer
      model
      year
      buildimages {
        image
      }
      mods {
        modtitle
      }
    }
  }
`;

export const ADD_BUILD = gql`
  mutation addBuild(
    $buildDescription: String!,
    $manufacturer: String!,
    $model: String!,
    $year: String!,
    $mods: [ModInput],
    $buildimages: [ImageInput]
    ) {
    addBuild(
      buildDescription: $buildDescription,
      manufacturer: $manufacturer,
      model: $model,
      year: $year,
      mods: $mods,
      buildimages: $buildimages
      ) {
      _id
      buildDescription
      username
      manufacturer
      model
      year
      createdAt
      commentCount
      comments {
        _id
        commentBody
        createdAt
      }
      buildimages {
        image
      }
      mods {
        modtitle
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($buildId: ID!, $commentBody: String!) {
    addComment(buildId: $buildId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const DELETE_BUILD = gql`
mutation deleteBuild($buildId: ID!) {
  deleteBuild(buildId: $buildId) {
    _id
  }
}
`;