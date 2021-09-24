import { TagDTO } from "../../repositories/TagRepository";
import { ListTagUseCase } from "./ListTagUseCase";

class ListTagController {
  constructor(private readonly listTagUseCase: ListTagUseCase) {}

  async handle(): Promise<Array<TagDTO>> {
    return await this.listTagUseCase.execute();
  }
}

export { ListTagController }