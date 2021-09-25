import 'reflect-metadata'

import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { TodoResolver } from './todo/TodoResolver'
import { TagResolver } from './tag/TagResolver'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const app = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [TodoResolver, TagResolver]
  })

  const apolloServer = new ApolloServer({ 
    schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    introspection: true
  })

  return apolloServer  
}

export { app };