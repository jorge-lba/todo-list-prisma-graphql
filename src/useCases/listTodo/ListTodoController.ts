import { TodoDTO } from '../../repositories/TodoRepository';
import { ListTodoUseCase } from './ListTodoUseCase';

class ListTodoController {
  constructor(private readonly listTodoUseCase: ListTodoUseCase) {}

  async handle(): Promise<TodoDTO[]> {
    const todos = await this.listTodoUseCase.execute();
    return todos;
  }
}

export { ListTodoController };
