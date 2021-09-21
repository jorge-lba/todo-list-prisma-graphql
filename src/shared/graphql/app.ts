import 'reflect-metadata'

import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { TodoResolver } from './todo/TodoResolver'

const app = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [TodoResolver]
  })

  const apolloServer = new ApolloServer({ schema })

  return apolloServer  
}

export { app };