import { TodoDTO } from "../../repositories/TodoRepository";
import { CreateTodoUseCase } from "./CreateTodoUseCase";

interface ReceivedData {
  title: string;
  description: string;
};

interface Controller {
  handle(data: any): Promise<any>;
}

class CreateTodoController {
  constructor(private readonly createTodoUseCase: CreateTodoUseCase) {}

  async handle(data: ReceivedData): Promise<TodoDTO> {
    const {
      title,
      description,
    } = data;

    const todo = await this.createTodoUseCase.execute({
      title,
      description,
    });

    return todo; 
  }
}

export { CreateTodoController, Controller };