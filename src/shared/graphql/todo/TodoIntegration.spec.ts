import { ApolloServer, gql } from "apollo-server-express";
import { app } from "../app";

describe("Todo Integration", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await app();
  });

  const todoDefault = {
    title: "Test Todo",
    description: "Test Todo Description",
  };

  it("should be able to create a todo", async () => {
    const res = await server.executeOperation({
      query: gql`mutation CreateTodoMutation($createInput: CreateTodoInput!) {
        createTodo(createTodoInput: $createInput) {
          title
          done
          description
        }
      }`,
      variables: {
        createInput: todoDefault,
      },
    });

    const todo = res.data;

    expect(todo).toEqual({
      createTodo: {
        title: "Test Todo",
        description: "Test Todo Description",
        done: false,
      }
    });
  })

  it('should be list all todo', async() => {
    const res = await server.executeOperation({
      query: gql`query TodosQuery {
        todos {
          id
          title
          done
          description
        }
      }`,
    });

    const todos = res.data;

    expect(todos).toEqual({
      todos: [{
          id: '1',
          title: "Test Todo",
          done: false,
          description: "Test Todo Description"
        }]
    });
  })

  it('should be return one todo by id', async() => {
    const res = await server.executeOperation({
      query: gql`query FindByIdQuery($id: Float!) {
        findById(todoId: $id) {
          id
          title
          done
          description
        }
      }`,
      variables: {
        id: 1
      }
    });

    const todo = res.data;

    expect(todo).toEqual({
      findById: {
        id: '1',
        ...todoDefault,
        done: false,
      }
    });
  })

  it('should be changed state done the todo', async () => {
    const res = await server.executeOperation({
      query: gql`mutation ToggleDoneTodoMutation($id: Float!) {
        toggleDoneTodo(todoId: $id) {
          id
          title
          done
          description
        }
      }`,
      variables: {
        id: 1
      }
    });

    const todo = res.data;

    expect(todo).toEqual({
      toggleDoneTodo: {
        id: '1',
        ...todoDefault,
        done: true,
      }
    });
  })

  it('should be update title and description for an todo', async () => {
    const res = await server.executeOperation({
      query: gql`mutation UpdateTodoMutation($updateTodoUpdateTodoInput: UpdateTodoInput!, $updateTodoTodoId: Float!) {
        updateTodo(updateTodoInput: $updateTodoUpdateTodoInput, todoId: $updateTodoTodoId) {
          id
          title
          done
          description
        }
      }`,
      variables: {
        updateTodoTodoId: 1,
        updateTodoUpdateTodoInput: {
          title: "Test Todo Updated",
          description: "Test Todo Description Updated"
        }
      }
    });

    const todo = res.data;

    expect(todo).toEqual({
      updateTodo: {
        id: '1',
        title: "Test Todo Updated",
        description: "Test Todo Description Updated",
        done: true,
      }
    });
  })

  it('should be delete one todo', async() => {
    const res = await server.executeOperation({
      query: gql`mutation DeleteTodoMutation($id: Float!) {
        deleteTodo(todoId: $id) {
          status
        }
      }`,
      variables: {
        id: 1
      }
    });

    const resList = await server.executeOperation({
      query: gql`query TodosQuery {
        todos {
          id
        }
      }`,
    });

    const todos = resList.data;

    const data = res.data;

    expect(data).toEqual({
      deleteTodo: {
        status: true
      }
    });

    expect(todos).toEqual({
      todos: []
    });
  })
});