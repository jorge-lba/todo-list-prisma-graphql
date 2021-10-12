import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';

import { app } from './app';

const server = async (app: () => Promise<ApolloServer>) => {
  const server = await app();

  return server
    .listen({ port: process.env.PORT })
    .then(() => console.log('Server is running on http://localhost:4100'));
};

server(app);
