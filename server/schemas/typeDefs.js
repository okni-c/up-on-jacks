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
    year: Int
    img: String
    commentCount: Int
}

type User {
    _id: ID
    username: String
    email: String
    followerCount: Int
    builds: [Build]
    followers: [User]
  }

type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

type Auth {
    token: ID!
    user: User
  }

type Query {
    builds(username: String): [Build]
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
    addBuild(buildDescription: String!, manufacturer: String!, model: String!, year: Int!, img: String!): Build
    addComment(buildId: ID!, commentBody: String!): Build
    addFollower(followerId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;