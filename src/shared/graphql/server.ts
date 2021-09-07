import 'reflect-metadata'

import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { TodoResolver } from './todo/TodoResolver'

const server = async () => {
  const schema = await buildSchema({
    resolvers: [TodoResolver]
  })

  const apolloServer = new ApolloServer({ schema })

  apolloServer
    .listen({port: 4100})
    .then(() => 
      console.log('Server is running on http://localhost:4100')
    )
}

server()