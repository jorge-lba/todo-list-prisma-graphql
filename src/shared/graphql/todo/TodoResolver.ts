import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { AddTagsInTodoController } from 'useCases/addTagsInTodo/AddTagsInTodoController';

import { TodoDTO, TodoRepository } from '../../../repositories/TodoRepository';
import { TodoRepositoryImp } from '../../../repositories/TodoRepositoryImp';
import { CreateTodoController } from '../../../useCases/createTodo/CreateTodoController';
import { DeleteTodoController } from '../../../useCases/deleteTodo/DeleteTodoController';
import { FindByIdTodoController } from '../../../useCases/findByIdTodo/FindByIdTodoController';
import { ListTodoController } from '../../../useCases/listTodo/ListTodoController';
import { ToggleDoneTodoController } from '../../../useCases/toggleDoneTodo/toggleDoneTodoController';
import { UpdateTodoController } from '../../../useCases/updateTodo/UpdateTodoController';
import {
  createTodoController,
  listTodoController,
  toggleDoneTodoController,
  updateTodoController,
  deleteTodoController,
  findByIdController,
  addTagsInTodoController,
} from '../../containers/TodoContainer';
import { Database } from '../../database/prisma';
import { TodoObjectType, TodoStatus } from './TodoObjectType';

@InputType()
class CreateTodoInput {
  @Field()
  title: string;
  @Field()
  description: string;
}

@InputType()
class UpdateTodoInput {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
}

@InputType()
class AddTagsInTodoInput {
  @Field()
  todoId: number;
  @Field(() => [Number])
  tagsIds: Array<number>;
}

@Resolver(TodoObjectType)
class TodoResolver {
  todoRepository: TodoRepository;

  createTodoController: CreateTodoController;
  listTodoController: ListTodoController;
  findByIdController: FindByIdTodoController;
  toggleDoneTodoController: ToggleDoneTodoController;
  updateTodoController: UpdateTodoController;
  deleteTodoController: DeleteTodoController;
  addTagsInTodoController: AddTagsInTodoController;

  constructor() {
    this.todoRepository = new TodoRepositoryImp(Database.instance);

    this.createTodoController = createTodoController(this.todoRepository);
    this.listTodoController = listTodoController(this.todoRepository);
    this.findByIdController = findByIdController(this.todoRepository);
    this.toggleDoneTodoController = toggleDoneTodoController(
      this.todoRepository,
    );
    this.updateTodoController = updateTodoController(this.todoRepository);
    this.deleteTodoController = deleteTodoController(this.todoRepository);
    this.addTagsInTodoController = addTagsInTodoController(this.todoRepository);
  }

  @Query(() => [TodoObjectType])
  async todos(): Promise<TodoDTO[]> {
    const todos = await this.listTodoController.handle();

    return todos;
  }

  @Query(() => TodoObjectType)
  async findById(
    @Arg('todoId') todoId: number,
  ): Promise<TodoDTO | null | undefined> {
    const todo = await this.findByIdController.handle(todoId);

    return todo;
  }

  @Mutation(() => TodoObjectType)
  async createTodo(
    @Arg('createTodoInput') createTodoInput: CreateTodoInput,
  ): Promise<TodoDTO> {
    const todo = await this.createTodoController.handle(createTodoInput);

    return todo;
  }

  @Mutation(() => TodoObjectType)
  async toggleDoneTodo(
    @Arg('todoId') todoId: number,
  ): Promise<TodoDTO | undefined> {
    const todo = await this.toggleDoneTodoController.handle(todoId);

    return todo;
  }

  @Mutation(() => TodoObjectType)
  async updateTodo(
    @Arg('todoId') todoId: number,
    @Arg('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ): Promise<TodoDTO | undefined> {
    const todo = await this.updateTodoController.handle({
      id: todoId,
      ...updateTodoInput,
    });

    return todo;
  }

  @Mutation(() => TodoStatus)
  async deleteTodo(
    @Arg('todoId') todoId: number,
  ): Promise<{ status: boolean }> {
    const status = await this.deleteTodoController.handle(todoId);

    return { status };
  }

  @Mutation(() => Boolean)
  async addTagsInTodo(
    @Arg('addTagsInTodoInput') addTagsInTodoInput: AddTagsInTodoInput,
  ): Promise<boolean> {
    const { todoId, tagsIds } = addTagsInTodoInput;

    await this.addTagsInTodoController.handle(todoId, tagsIds);
    return true;
  }
}

export { TodoResolver };
