import { TodoDTO } from "../../repositories/TodoRepository";
import { ListTodoUseCase } from "./ListTodoUseCase";


class ListTodoController {
  constructor(private readonly listTodoUseCase: ListTodoUseCase) {}

  async handle(): Promise<TodoDTO[]> {
    return await this.listTodoUseCase.execute();
  }
}

export { ListTodoController };