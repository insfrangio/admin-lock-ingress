import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';

import connectDb from '../../db/config/index';
import resolvers from '../api/resolvers/index';
import typeDefs from '../api/schemas/index';

connectDb();

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export const config = {
  api: {
    bodyParser: false
  }
};

const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
}
