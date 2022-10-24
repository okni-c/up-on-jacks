const { gql } = require('apollo-server-express');

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
    bio: String
    builds: [Build]
    followers: [User]
  }

type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
    profileimg: String
  }

type Mod {
  _id: ID
  modtitle: String
}

input ModInput {
  modtitle: String
}

type Image {
  _id: ID
  image: String
}

input ImageInput {
  image: String
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
    users: [User]
    user(username: String!): User
    builds(username: String): [Build]
    build(_id: ID!): Build
    searchBuilds(search: String): [Build]
  }

type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    modifyUser(userId: ID!, username: String!, profileimg: String, usertitle: String, city: String, state: String, bio: String): User

    modifyBuild(buildId: ID!, buildDescription: String, manufacturer: String, model: String, year: String, mods: [ModInput], buildimages: [ImageInput]): Build

    addBuild(buildDescription: String!, manufacturer: String!, model: String!, year: String!, mods: [ModInput], buildimages: [ImageInput]): Build

    deleteBuild(buildId: ID!): Build

    addComment(buildId: ID!, commentBody: String!, profileimg: String): Build

    addFollower(followerId: ID!): User
  }
`;

module.exports = typeDefs;