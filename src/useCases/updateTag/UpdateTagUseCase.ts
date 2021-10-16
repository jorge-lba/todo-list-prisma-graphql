import {
  CreateTagDTO,
  TagDTO,
  TagRepository,
} from 'repositories/TagRepository';

class UpdateTagUseCase {
  constructor(private tagRepository: TagRepository) {}

  async execute(tagId: number, data: Partial<CreateTagDTO>): Promise<TagDTO> {
    return this.tagRepository.updatedById(tagId, data);
  }
}

export { UpdateTagUseCase };
