import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import { TagResolver } from './tag/TagResolver';
import { TodoResolver } from './todo/TodoResolver';

const app = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [TodoResolver, TagResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true,
  });

  return apolloServer;
};

export { app };
