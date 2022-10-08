import { gql } from '@apollo/client';

export const QUERY_SEARCH = gql`
query searchBuilds($search: String) {
  searchBuilds(search: $search) {
    _id
    buildDescription
    createdAt
    username
    manufacturer
    model
    year
    mods {
      _id
      modtitle
    }
    buildimages {
      _id
      image
    }
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
      mods {
        _id
        modtitle
      }
      buildimages {
        _id
        image
      }
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
        mods {
          _id
          modtitle
        }
        buildimages {
          _id
          image
        }
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