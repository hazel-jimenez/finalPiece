const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    favoriteCount: Int
    ad: [Ad]
    favorites: [User]
  }

  type Ad {
    _id: ID
    adText: String
    createdAt: String
    username: String
    reviewCount: Int
    reviews: [Review]
  }

  type Review {
    _id: ID
    reviewBody: String
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
    ads(username: String): [Ad]
    ad(_id: ID!): Ad
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAd(adText: String!): Ad
    addReview(adId: ID!, reviewBody: String!): Ad
    addFavorite(favoriteId: ID!): User
  }
`;

module.exports = typeDefs;
