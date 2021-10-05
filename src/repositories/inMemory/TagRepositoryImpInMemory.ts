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
  
  async findAll(): Promise<TagDTO[]>{
    return this.tags;
  };
  
  async findOneById(tagId: number): Promise<TagDTO >{
    const tag = this.tags.find(tag => tag.id === tagId);
    
    if(!tag){
      throw new Error('Tag not found');
    }
    
    return tag;
  };

  async findAllByIds(tagIds: number[]): Promise<TagDTO[]>{
    const tags = this.tags.filter(tag => tagIds.includes(tag.id));

    if(tags.length <= 0){
      throw new Error('Tags not found');
    }

    return tags;
  };
}

export { TagRepositoryImpInMemory }