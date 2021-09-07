import { TodoDTO, TodoRepository } from "../../repositories/TodoRepository";

class ToggleDoneTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(todoId: number): Promise<TodoDTO | undefined> {
    const todo = await this.todoRepository.toggleDoneById(todoId);
    return todo;
  }
}

export { ToggleDoneTodoUseCase };