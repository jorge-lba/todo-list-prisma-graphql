import { TagDTO } from '../../repositories/TagRepository';
import { UpdateTagUseCase } from './UpdateTagUseCase';

interface ReceivedData {
  id: number;
  name?: string;
  description?: string;
}

class UpdateTagController {
  constructor(private readonly updateTagUseCase: UpdateTagUseCase) {}

  async handle(data: ReceivedData): Promise<TagDTO | undefined> {
    const { id, name, description } = data;

    const tag = await this.updateTagUseCase.execute(id, {
      name,
      description,
    });

    return tag;
  }
}

export { UpdateTagController };
