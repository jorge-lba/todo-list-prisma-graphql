import { AddTagsInTodoUseCase } from './AddTagsInTodoUseCase';

class AddTagsInTodoController {
  constructor(private readonly addTagsInTodoUseCase: AddTagsInTodoUseCase) {}

  async handle(todoId: number, tagIds: number[]): Promise<void> {
    await this.addTagsInTodoUseCase.execute(todoId, tagIds);
  }
}

export { AddTagsInTodoController };
