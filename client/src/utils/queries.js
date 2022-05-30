import { gql } from "@apollo/client";

export const QUERY_ADS = gql`
  query ads($username: String) {
    ads(username: $username) {
      _id
      adText
      createdAt
      username
      reviewCount
      reviews {
        _id
        createdAt
        username
        reviewBody
      }
    }
  }
`;

export const QUERY_AD = gql`
  query ad($id: ID!) {
    ad(_id: $id) {
      _id
      adText
      createdAt
      username
      reviewCount
      reviews {
        _id
        createdAt
        username
        reviewBody
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
      favoriteCount
      favorites {
        _id
        username
      }
      ads {
        _id
        adText
        createdAt
        reviewCount
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
      favoriteCount
      ads {
        _id
        adText
        createdAt
        reviewCount
        reviews {
          _id
          createdAt
          reviewBody
          username
        }
      }
      favorites {
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
      email
      favoriteCount
      favorites {
        _id
        username
      }
    }
  }
`;
