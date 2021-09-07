import { TodoRepository } from "../../repositories/TodoRepository";

class DeleteTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(todoId: number): Promise<void> {
    await this.todoRepository.delete(todoId);
  }
}

export { DeleteTodoUseCase };