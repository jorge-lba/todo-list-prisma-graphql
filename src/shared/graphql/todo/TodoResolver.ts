import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

import { TodoRepositoryImpInMemory } from "../../../repositories/inMemory/TodoRepositoryImpInMemory";
import { TodoRepository } from "../../../repositories/TodoRepository";
import { CreateTodoController } from "../../../useCases/createTodo/CreateTodoController";
import { ListTodoController } from "../../../useCases/listTodo/ListTodoController";
import { ToggleDoneTodoController } from "../../../useCases/toggleDoneTodo/toggleDoneTodoController";
import { TodoObjectType } from "./TodoObjectType";

import { 
  createTodoController, 
  listTodoController, 
  toggleDoneTodoController 
} from "../../containers/TodoContainer";

@InputType()
class CreateTodoInput {
  @Field()
  title: string;
  @Field()
  description: string;
};

@InputType()
class ToggleDoneTodoInput{
  @Field()
  id: number;
}

@Resolver(TodoObjectType)
class TodoResolver {
  todoRepository: TodoRepository;

  createTodoController: CreateTodoController;
  listTodoController: ListTodoController;
  toggleDoneTodoController: ToggleDoneTodoController;

  constructor(){
    this.todoRepository = new TodoRepositoryImpInMemory();

    this.createTodoController = createTodoController(this.todoRepository);
    this.listTodoController = listTodoController(this.todoRepository);
    this.toggleDoneTodoController = toggleDoneTodoController(this.todoRepository);
  
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

  @Mutation(() => TodoObjectType)
  async toggleDoneTodo(@Arg("todoId") todoId: number){
    const todo = await this.toggleDoneTodoController.handle(todoId);

    return todo
  }
}

export { TodoResolver }