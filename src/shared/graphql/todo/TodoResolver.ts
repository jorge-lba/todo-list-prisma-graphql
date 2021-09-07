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
  toggleDoneTodoController,
  updateTodoController
} from "../../containers/TodoContainer";
import { UpdateTodoController } from "../../../useCases/updateTodo/UpdateTodoController";

@InputType()
class CreateTodoInput {
  @Field()
  title: string;
  @Field()
  description: string;
};

@InputType()
class UpdateTodoInput {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
};

@Resolver(TodoObjectType)
class TodoResolver {
  todoRepository: TodoRepository;

  createTodoController: CreateTodoController;
  listTodoController: ListTodoController;
  toggleDoneTodoController: ToggleDoneTodoController;
  updateTodoController: UpdateTodoController;

  constructor(){
    this.todoRepository = new TodoRepositoryImpInMemory();

    this.createTodoController = createTodoController(this.todoRepository);
    this.listTodoController = listTodoController(this.todoRepository);
    this.toggleDoneTodoController = toggleDoneTodoController(this.todoRepository);
    this.updateTodoController = updateTodoController(this.todoRepository);
  
  }

  @Query(() => [TodoObjectType])
  async todos(){
    const todos = await this.listTodoController.handle();

    return todos
  }

  @Query(() => TodoObjectType)
  async findById(@Arg("todoId") todoId: number){
    const todo = await this.todoRepository.findById(todoId);

    return todo
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

  @Mutation(() => TodoObjectType)
  async updateTodo(@Arg("todoId") todoId: number, @Arg("updateTodoInput") updateTodoInput: UpdateTodoInput){
    const todo = await this.updateTodoController.handle({
      id: todoId,
      ...updateTodoInput
    });

    return todo
  }
}

export { TodoResolver }