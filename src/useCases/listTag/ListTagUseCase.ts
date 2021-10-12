import { TagDTO, TagRepository } from '../../repositories/TagRepository';

class ListTagUseCase {
  constructor(private tagRepository: TagRepository) {}

  async execute(): Promise<Array<TagDTO>> {
    return this.tagRepository.findAll();
  }
}

export { ListTagUseCase };
