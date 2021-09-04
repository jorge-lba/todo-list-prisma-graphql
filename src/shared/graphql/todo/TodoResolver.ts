import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { TodoRepositoryImpInMemory } from "../../../repositories/inMemory/TodoRepositoryImpInMemory";
import { TodoRepository } from "../../../repositories/TodoRepository";
import { CreateTodoController } from "../../../useCases/createTodo/CreateTodoController";
import { ListTodoController } from "../../../useCases/listTodo/ListTodoController";
import { createTodoController, listTodoController } from "../../containers/TodoContainer";
import { TodoObjectType } from "./TodoObjectType";

@InputType()
class CreateTodoInput {
  @Field()
  title: string;
  @Field()
  description: string;
};

@Resolver(TodoObjectType)
class TodoResolver {
  createTodoController: CreateTodoController;
  listTodoController: ListTodoController;
  todoRepository: TodoRepository;

  constructor(){
    this.todoRepository = new TodoRepositoryImpInMemory();
    this.createTodoController = createTodoController(this.todoRepository);
    this.listTodoController = listTodoController(this.todoRepository);
  }

  @Query(() => [TodoObjectType])
  async todos(){
    const todos = await this.listTodoController.handle();

    return todos
  }

  @Mutation(() => TodoObjectType)
  async createTodo(@Arg("createTodoInput") createTodoInput: CreateTodoInput){
    const todo = await this.createTodoController
      .handle(createTodoInput)

    return todo
  }
}

export { TodoResolver }