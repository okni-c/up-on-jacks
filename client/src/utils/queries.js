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
      profileimg
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
        profileimg
      }
    }
  }
`;

export const QUERY_USER_PIC = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    profileimg
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
      bio
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
          profileimg
        }
      }
    }
  }
`;

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

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      usertitle
      city
      state
      bio
      email
      profileimg
      followerCount
      followers {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      usertitle
      city
      state
      bio
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
          profileimg
        }
      }
    }
  }
`;