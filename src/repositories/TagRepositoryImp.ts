import { CreateTagDTO, TagDTO, TagRepository } from "./TagRepository";

class TagRepositoryImp implements TagRepository {
  async create({ name, description }: CreateTagDTO): Promise<TagDTO>{
    return {
      id: 784,
      name,
      description
    };
  };
}

export { TagRepositoryImp };