import { TodoDTO } from "../../repositories/TodoRepository";
import { FindByIdTodoUseCase } from "./FindByIdTodoUseCase";

class FindByIdTodoController {
  constructor(private readonly findByIdTodoUseCase: FindByIdTodoUseCase) {}

  async handle(id: number): Promise<TodoDTO | undefined | null> {
    const todos = await this.findByIdTodoUseCase.execute(id);

    return todos;
  }
}

export { FindByIdTodoController };