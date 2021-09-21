import { CreateTagDTO, TagDTO, TagRepository } from "../../repositories/TagRepository";

class CreateTagUseCase {
  constructor(private tagRepository: TagRepository) {}

  async execute({ name, description }: CreateTagDTO): Promise<TagDTO> {
    const tag = this.tagRepository.create({ name, description });

    return tag;
  }
};

export { CreateTagUseCase };