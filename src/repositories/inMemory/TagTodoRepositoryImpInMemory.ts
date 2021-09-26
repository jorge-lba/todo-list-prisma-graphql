import { TagTodoDTO, TagTodoRepository } from "repositories/TagTodoRepository";

class TagTodoRepositoryImpInMemory implements TagTodoRepository {
  tagsPosts: Array<TagTodoDTO>

  constructor() {
    this.tagsPosts = new Array<TagTodoDTO>();
  }
  
  async create(tagId: number, todoId: number): Promise<void> {
    await this.tagsPosts.push({
      tagId: tagId,
      todoId: todoId,
      createdAt: new Date()
    });
  }

  async bulkCreateTagsOnePost(todoId: number, tagIds: number[]): Promise<void> {
    const promises = tagIds.map(tagId => this.create(tagId, todoId));
    await Promise.all(promises);
  }

  async findAllByTodoId(todoId: number): Promise<TagTodoDTO[]> {
    return await this.tagsPosts.filter(tagPost => tagPost.todoId === todoId);
  }
} 

export { TagTodoRepositoryImpInMemory };