import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { TodoRepositoryImpInMemory } from "../../../repositories/inMemory/TodoRepositoryImpInMemory";
import { CreateTodoController } from "../../../useCases/createTodo/CreateTodoController";
import { createTodoController } from "../../containers/TodoContainer";
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
  constructor(){
    this.createTodoController = createTodoController(new TodoRepositoryImpInMemory())
  }

  @Query(() => [TodoObjectType])
  async todos(){
    return [
      {
        id: 1,
        title: "First Todo",
        description: "This is the first todo",
        completed: false
      },
      {
        id: 2,
        title: "Second Todo",
        description: "This is the second todo",
        completed: false
      }
    ]
  }

  @Mutation(() => TodoObjectType)
  async createTodo(@Arg("createTodoInput") createTodoInput: CreateTodoInput){
    const todo = await this.createTodoController
      .handle(createTodoInput)

    return todo
  }
}

export { TodoResolver }