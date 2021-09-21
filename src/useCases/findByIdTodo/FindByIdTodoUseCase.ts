import { TodoDTO, TodoRepository } from "../../repositories/TodoRepository";

class FindByIdTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: number): Promise<TodoDTO | undefined | null> {
    return await this.todoRepository.findById(id);
  }
}

export { FindByIdTodoUseCase };