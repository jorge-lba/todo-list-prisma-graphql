import { TagDTO } from '../../repositories/TagRepository';
import { ListTagUseCase } from './ListTagUseCase';

class ListTagController {
  constructor(private readonly listTagUseCase: ListTagUseCase) {}

  async handle(): Promise<Array<TagDTO>> {
    const tags = await this.listTagUseCase.execute();
    return tags;
  }
}

export { ListTagController };
