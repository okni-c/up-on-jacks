// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Build {
    _id: ID
    buildDescription: String
    createdAt: String
    username: String
    manufacturer: String
    model: String
    year: String
    img: String
    commentCount: Int
    comments: [Comment]
    buildimages: [Image]
    mods: [Mod]
}

type User {
    _id: ID
    username: String
    email: String
    followerCount: Int
    usertitle: String
    city: String
    state: String
    profileimg: String
    builds: [Build]
    followers: [User]
  }

type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

type Mod {
  _id: ID
  modtitle: String
}

type Image {
  _id: ID
  image: String
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    builds(username: String): [Build]
  }

type Query {
    searchBuilds(search: String): [Build]
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    builds(username: String): [Build]
    build(_id: ID!): Build
  }

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBuild(buildDescription: String!, manufacturer: String!, model: String!, year: String!): Build
    addComment(buildId: ID!, commentBody: String!): Build
    addFollower(followerId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;