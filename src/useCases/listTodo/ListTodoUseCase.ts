import { TodoDTO, TodoRepository } from '../../repositories/TodoRepository';

class ListTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(): Promise<TodoDTO[]> {
    return this.todoRepository.findAll();
  }
}

export { ListTodoUseCase };
