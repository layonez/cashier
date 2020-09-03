import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'express-jwt';

import { ApolloServer } from 'apollo-server-express';

import resolvers from './schemas/resolvers';
import typeDefs from './schemas/schema';
import { jwtSecret } from './settings';

const app = express();
const auth = jwt({
  secret: jwtSecret,
  credentialsRequired: false,
  algorithms: [ 'HS256' ],
});

app.use(auth);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
  },
  context: ({ req }) => {
    const user = JSON.parse(req.headers.user) || req?.user;
    return { user };
  },
});

server.applyMiddleware({ app });

// // error handler must come last, after every app.use() call
// app.use((err, _req, res) => {
//   debugger
//   res.status(400).json({ error: err.stack });
// });

export default app;
