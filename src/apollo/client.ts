import { ApolloClient, InMemoryCache } from '@apollo/client';

const URI = process.env.URI_API;

const client = new ApolloClient({
  uri: URI || 'http://localhost:3001/api/graphql',
  cache: new InMemoryCache()
});

export default client;
