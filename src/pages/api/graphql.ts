import connectDb from '@/db/config';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';

import resolvers from './resolvers';
import typeDefs from './schemas';

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

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
}
