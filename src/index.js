import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Launch the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});