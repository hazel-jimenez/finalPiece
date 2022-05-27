const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    advertise: [ advertise]
    favorites: [User]
  }

  type Ad {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    advertises(username: String): [Thought]
    advertise(_id: ID!):  advertise
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!):  advertise
    addReaction(adId: ID!, reactionBody: String!):  advertise
    addFavorite(favoriteId: ID!): User
  }
`;

module.exports = typeDefs;
