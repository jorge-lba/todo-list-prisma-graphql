import { TodoDTO } from "../../repositories/TodoRepository";
import { FindByIdTodoUseCase } from "./FindByIdTodoUseCase";

interface ReceivedData {
  id: number;
};

class FindByIdTodoController {
  constructor(private readonly findByIdTodoUseCase: FindByIdTodoUseCase) {}

  async handle(data: ReceivedData): Promise<TodoDTO | undefined> {
    const { id } = data;

    const todos = await this.findByIdTodoUseCase.execute(id);

    return todos;
  }
}

export { FindByIdTodoController };