import { CreateTagDTO, TagDTO, TagRepository } from "../TagRepository";

class TagRepositoryImpInMemory implements TagRepository {
  tags: Array<TagDTO>
  
  constructor() {
    this.tags = new Array<TagDTO>();
  }

  async create({ name, description }: CreateTagDTO):Promise<TagDTO>{
    const lastTodo = this.tags[this.tags.length - 1];

    const lastId = lastTodo ? lastTodo.id : 0;

    const index = await this.tags.push({
      id: lastId + 1,
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    }) - 1;

    return this.tags[index];
  };
}

export { TagRepositoryImpInMemory }