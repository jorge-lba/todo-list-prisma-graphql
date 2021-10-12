import { Prisma, PrismaClient, Tag, Todo } from '.prisma/client';

import { Database } from '../shared/database/prisma';
import {
  TodoCreateDTO,
  TodoDTO,
  TodoRepository,
  UpdateTodoDTO,
} from './TodoRepository';

class TodoRepositoryImp implements TodoRepository {
  model: Prisma.TodoDelegate<Todo>;
  prisma: PrismaClient;

  constructor(database: Database) {
    this.model = database.prisma.todo;
    this.prisma = database.prisma;
  }

  async create({ title, description }: TodoCreateDTO): Promise<TodoDTO> {
    const todo = await this.model.create({
      data: { title, description },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return todo;
  }

  async findAll(): Promise<TodoDTO[]> {
    const todos = await this.model.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return todos;
  }

  async findById(id: number): Promise<TodoDTO | undefined | null> {
    const todo = await this.model.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return todo;
  }

  async toggleDoneById(id: number): Promise<TodoDTO | undefined> {
    const [todo] = await this.prisma.$queryRaw<Array<Todo>>`
      UPDATE "public"."Todo"
      SET done = NOT done
      WHERE id = ${id}
      RETURNING *
    `;

    return todo;
  }

  async update(
    id: number,
    { title, description }: UpdateTodoDTO,
  ): Promise<TodoDTO | undefined> {
    const todo = await this.model.update({
      where: { id },
      data: { title, description },
    });

    return todo;
  }

  async delete(id: number): Promise<boolean> {
    await this.model.delete({
      where: { id },
    });

    return true;
  }

  async addTags(todoId: number, tagIds: number[]): Promise<void> {
    await this.model.update({
      where: { id: todoId },
      data: {
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
      },
    });
  }

  async findAllTags(todoId: number): Promise<Tag[] | []> {
    const todo = await this.model.findUnique({
      where: { id: todoId },
      select: {
        tags: true,
      },
    });

    return todo?.tags || [];
  }
}

export { TodoRepositoryImp };
