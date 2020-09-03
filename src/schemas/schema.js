import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    password: String!
    email: String
    joined: String!
    last_logged_in: String
  }

  type Currency {
    id: Int!
    long_name: String!
    short_name: String!
  }

  type Account {
    id: Int!
    amount: Float!
    comment: String
    name: String!
    currency_id: Int!
  }

  type Query {
    current: User
    user(id: Int!): User
    # beers(brand: String!): [Beer]
  }

  type Mutation {
    register(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }
`;

module.exports = typeDefs;
