import { ApolloServer, gql } from 'apollo-server-express';

import { app } from '../app';

describe('Tag Integration', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    // @ts-ignore
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

  it('should be list all tags', async () => {
    const res = await server.executeOperation({
      query: gql`
        query TodosQuery {
          tags {
            id
            name
            description
          }
        }
      `,
    });

    const todos = res.data;

    expect(todos).toEqual({
      tags: expect.arrayContaining([
        {
          id: '1',
          name: expect.any(String),
          description: expect.any(String),
        },
      ]),
    });
  });

  it('should be update name and description for an tag', async () => {
    const res = await server.executeOperation({
      query: gql`
        mutation UpdateTagMutation(
          $updateTagUpdateTagInput: UpdateTagInput!
          $updateTagTagId: Float!
        ) {
          updateTag(
            updateTagInput: $updateTagUpdateTagInput
            tagId: $updateTagTagId
          ) {
            id
            name
            description
          }
        }
      `,
      variables: {
        updateTagTagId: 1,
        updateTagUpdateTagInput: {
          name: 'Test Tag Updated',
          description: 'Test Tag Description Updated',
        },
      },
    });

    const tag = res.data;

    expect(tag).toEqual({
      updateTag: {
        id: '1',
        name: 'Test Tag Updated',
        description: 'Test Tag Description Updated',
      },
    });
  });

  it('should be delete one tag', async () => {
    const res = await server.executeOperation({
      query: gql`
        mutation DeleteTagMutation($id: Float!) {
          deleteTag(tagId: $id) {
            status
          }
        }
      `,
      variables: {
        id: 1,
      },
    });

    const resList = await server.executeOperation({
      query: gql`
        query tagsQuery {
          tags {
            id
          }
        }
      `,
    });

    const tags = resList.data;

    const { data } = res;

    expect(data).toEqual({
      deleteTag: {
        status: true,
      },
    });

    const tagIsValid = tags?.tags.findIndex(
      (tag: { id: number }) => tag.id === 1,
    );

    expect(tagIsValid === -1).toBe(true);
  });
});
