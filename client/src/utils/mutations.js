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

export const ADD_AD = gql`
  mutation addAd($adText: String!) {
    addAd(adText: $adText) {
      _id
      adText
      createdAt
      username
      reviewCount
      reviews {
        _id
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReaction($adId: ID!, $reviewBody: String!) {
    addReaction(adId: $adId, reviewBody: $reviewBody) {
      _id
      reviewCount
      reviews {
        _id
        reviewBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($id: ID!) {
    addFavorite(favoriteId: $id) {
      _id
      username
      favoriteCount
      favorites {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($id: ID!) {
    removeFavorite(id: $id) {
      _id
      username
      favorites {
        _id
        username
      }
    }
  }
`;
