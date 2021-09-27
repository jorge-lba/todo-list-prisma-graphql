import { TodoRepository } from "repositories/TodoRepository";

class AddTagsInPostUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(todoId: number, tagIds: Array<number>): Promise<void> {
    const todo = await this.todoRepository.findById(todoId);

    if (!todo) {
      throw new Error("Todo not found");
    }

    await this.todoRepository.addTags(todoId, tagIds);
  }
}

export {AddTagsInPostUseCase}