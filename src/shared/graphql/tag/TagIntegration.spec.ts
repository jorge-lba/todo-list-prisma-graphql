import { ApolloServer, gql } from "apollo-server-express";
import { TagRepositoryImpInMemory } from "../../../repositories/inMemory/TagRepositoryImpInMemory";
import { app } from "../app";

jest.mock('../../../repositories/TagRepositoryImp', () => ({
  __esModule: true,
  TagRepositoryImp: TagRepositoryImpInMemory
}));

describe('Tag Integration', () => {
  let server: ApolloServer

  beforeAll(async () => {
    server = await app();
  });

  const tagDefault = {
    name: 'Prisma',
    description: 'Prisma is a GraphQL client for your existing database.',
  };

  it('should be able to create a todo', async () => {
    const res = await server.executeOperation({
      query: gql`
        mutation CreateTagMutation($createInput: CreateTagInput!) {
          createTag(createTagInput: $createInput) {
            name
            description
          }
        }
      `,
      variables: {
        createInput: tagDefault,
      },
    });

    const tag = res.data;

    expect(tag).toEqual({
      createTag: {
        name: 'Prisma',
        description: 'Prisma is a GraphQL client for your existing database.',
      },
    });
  });


  it('should be list all tags', async() => {
    const res = await server.executeOperation({
      query: gql`query TodosQuery {
        tags {
          id
          name
          description
        }
      }`,
    });

    const todos = res.data;

    expect(todos).toEqual({
      tags: [{
          id: '1',
          name: 'Prisma',
          description: 'Prisma is a GraphQL client for your existing database.',
        }]
    });
  })
});