import {
  CreateTagDTO,
  TagDTO,
  TagRepository,
} from 'repositories/TagRepository';

import { TagRepositoryImpInMemory } from '../../repositories/inMemory/TagRepositoryImpInMemory';
import { UpdateTagUseCase } from './UpdateTagUseCase';

describe('Update Tag Use Case', () => {
  let repository: TagRepository;
  let updateUseCase: UpdateTagUseCase;

  let updateTag: (
    tagId: number,
    data: Partial<CreateTagDTO>,
  ) => Promise<TagDTO | undefined>;

  beforeAll(async () => {
    repository = new TagRepositoryImpInMemory();
    updateUseCase = new UpdateTagUseCase(repository);

    updateTag = update(updateUseCase);
  });

  it('should be update title and description for an tag', async () => {
    const tag = await repository.create({
      name: 'title',
      description: 'description',
    });

    const updatedTag = await updateTag(tag.id, {
      name: 'new title',
      description: 'new description',
    });

    expect(updatedTag).toEqual(
      expect.objectContaining({
        id: tag.id,
        name: 'new title',
        description: 'new description',
      }),
    );
  });

  const update =
    (updateUseCase: UpdateTagUseCase) =>
    async (tagId: number, data: Partial<CreateTagDTO>) =>
      await updateUseCase.execute(tagId, data);
});
