import { TodoDTO } from "../../repositories/TodoRepository";
import { ToggleDoneTodoUseCase } from "./toggleDoneTodoUseCase";

class ToggleDoneTodoController {
  constructor(private readonly toggleDoneTodoUseCase: ToggleDoneTodoUseCase) {}

  async handle(todoId: number): Promise<TodoDTO | undefined> {
    return this.toggleDoneTodoUseCase.execute(todoId);
  }
}

export { ToggleDoneTodoController };