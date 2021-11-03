import { TagRepository } from '../../repositories/TagRepository';

class DeleteTagUseCase {
  constructor(private tagRepository: TagRepository) {}

  async execute(tagId: number): Promise<void> {
    await this.tagRepository.deleteById(tagId);
  }
}

export { DeleteTagUseCase };
