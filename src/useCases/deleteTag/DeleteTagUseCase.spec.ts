import { TagRepositoryImpInMemory } from '../../repositories/inMemory/TagRepositoryImpInMemory';
import { TagRepository } from '../../repositories/TagRepository';
import { DeleteTagUseCase } from './DeleteTagUseCase';

describe('Delete Tag Use Case', () => {
  let repository: TagRepository;
  let deleteUseCase: DeleteTagUseCase;

  let deleteTag: (tagId: number) => Promise<void>;

  beforeEach(() => {
    repository = new TagRepositoryImpInMemory();
    deleteUseCase = new DeleteTagUseCase(repository);
    deleteTag = deleteOne(deleteUseCase);
  });

  it('should delete a tag', async () => {
    const { id } = await repository.create({
      name: 'tag 1',
      description: 'description 1',
    });

    await deleteTag(id);

    const tagList = await repository.findAll();

    expect(tagList).toHaveLength(0);
  });

  const deleteOne =
    (deleteUseCase: DeleteTagUseCase) => async (tagId: number) =>
      await deleteUseCase.execute(tagId);
});
