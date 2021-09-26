interface TagTodoDTO {
  tagId: number;
  todoId: number;
  createdAt?: Date;
}

interface TagTodoRepository {
  create(tagId: number, todoId: number): Promise<void>;
  bulkCreateTagsOnePost(todoId: number, tagIds: number[]): Promise<void>;
  findAllByTodoId(todoId: number): Promise<TagTodoDTO[]>;
}

export { TagTodoRepository, TagTodoDTO };