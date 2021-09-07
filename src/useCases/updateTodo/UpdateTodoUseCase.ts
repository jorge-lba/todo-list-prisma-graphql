import { TodoRepository, TodoDTO, UpdateTodoDTO } from "../../repositories/TodoRepository";

class UpdateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  public async execute(todoId: number ,todoData: UpdateTodoDTO): Promise<TodoDTO | undefined> {
    return this.todoRepository.update(todoId, todoData);
  }
}

export { UpdateTodoUseCase };