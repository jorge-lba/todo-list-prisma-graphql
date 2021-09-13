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

    return todo
  };

  async findAll():Promise<TodoDTO[]> {
    const todos = await this.model.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return todos;
  };

  async findById(id: number):Promise<TodoDTO | undefined | null>{
    const todo = await this.model.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return todo;
  };
  
  toggleDoneById: (id: number) => Promise<TodoDTO | undefined>;
  update: (id: number, { title, description }: UpdateTodoDTO) => Promise<TodoDTO | undefined>;
  delete: (id: number) => Promise<boolean>;
}

export { TodoRepositoryImp };