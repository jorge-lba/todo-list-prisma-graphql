import 'reflect-metadata'

import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { TodoResolver } from './todo/TodoResolver'
import { TagResolver } from './tag/TagResolver'

const app = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [TodoResolver, TagResolver]
  })

  const apolloServer = new ApolloServer({ schema })

  return apolloServer  
}

export { app };