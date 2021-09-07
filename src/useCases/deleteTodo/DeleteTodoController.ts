import { DeleteTodoUseCase } from "./DeleteTodoUseCase";


class DeleteTodoController {
  constructor( private readonly deleteTodoUseCase: DeleteTodoUseCase ) {}

  async handle( todoId: number ): Promise<boolean> {
    await this.deleteTodoUseCase.execute( todoId );

    return true;
  }
}

export { DeleteTodoController };