import { TagDTO } from '../../repositories/TagRepository';
import { CreateTagUseCase } from './CreateTagUseCase';

interface ReceivedData {
  name: string;
  description: string;
}

class CreateTagController {
  constructor(private readonly createTagUseCase: CreateTagUseCase) {}

  async handle(data: ReceivedData): Promise<TagDTO> {
    const { name, description } = data;
    const tag = await this.createTagUseCase.execute({
      name,
      description,
    });

    return tag;
  }
}

export { CreateTagController };
