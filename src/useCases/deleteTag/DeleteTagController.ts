import { DeleteTagUseCase } from './DeleteTagUseCase';

class DeleteTagController {
  constructor(private deleteTagUseCase: DeleteTagUseCase) {}

  async handle(tagId: number): Promise<boolean> {
    await this.deleteTagUseCase.execute(tagId);

    return true;
  }
}

export { DeleteTagController };
