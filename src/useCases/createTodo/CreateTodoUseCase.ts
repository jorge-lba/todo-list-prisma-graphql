import { TodoCreateDTO, TodoDTO, TodoRepository } from "../../repositories/TodoRepository";

class CreateTodoUseCase {
  constructor(private repository: TodoRepository) {}

  async execute({ title, description }: TodoCreateDTO): Promise<TodoDTO> {
    const todo = await this.repository.create({ title, description });

    return todo;
  }
}

export { CreateTodoUseCase };