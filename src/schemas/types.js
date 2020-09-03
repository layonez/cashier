const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
} = graphql;

export const CurrencyType = new GraphQLObjectType({
  name: 'Currency',
  type: 'Query',
  fields: {
    id: { type: GraphQLID },
    long_name: { type: GraphQLString },
    short_name: { type: GraphQLString },
  },
});

export const AccountType = new GraphQLObjectType({
  name: 'Account',
  type: 'Query',
  fields: {
    id: { type: GraphQLID },
    amount: { type: GraphQLFloat },
    comment: { type: GraphQLString },
    name: { type: GraphQLString },
    currency_id: { type: GraphQLString },
    currency: {
      type: CurrencyType,
    },
    user_id: { type: GraphQLString },
  },
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  type: 'Query',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    joined: { type: GraphQLString },
    last_logged_in: { type: GraphQLString },
    accounts: {
      type: new GraphQLList(AccountType),
    },
  },
});
