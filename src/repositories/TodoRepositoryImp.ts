import { Prisma, todo } from ".prisma/client";
import { Database } from "../shared/database/prisma";
import { TodoCreateDTO, TodoDTO, TodoRepository, UpdateTodoDTO } from "./TodoRepository";

class TodoRepositoryImp implements TodoRepository {
  model: Prisma.todoDelegate<todo>;

  constructor(database: Database){
    //@ts-ignore
    this.model = database.instance.prisma.todo;
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
      }
    });

    return {
      id: todoResponse.id,
      title: todoResponse.title,
      description: todoResponse.description,
      done: todoResponse.done,
    }
  };

  findAll: () => Promise<TodoDTO[]>;
  findById: (id: number) => Promise<TodoDTO | undefined>;
  toggleDoneById: (id: number) => Promise<TodoDTO | undefined>;
  update: (id: number, { title, description }: UpdateTodoDTO) => Promise<TodoDTO | undefined>;
  delete: (id: number) => Promise<boolean>;
}

export { TodoRepositoryImp };