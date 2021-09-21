import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'
import { app } from './app'

const server = async (app: () => Promise<ApolloServer>) => {
  const server = await app()

  return server
    .listen({port: 4100})
    .then(() => 
      console.log('Server is running on http://localhost:4100')
    )
}

server(app)