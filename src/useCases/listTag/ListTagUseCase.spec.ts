import { TagRepositoryImpInMemory } from '../../repositories/inMemory/TagRepositoryImpInMemory';
import { TagDTO, TagRepository } from '../../repositories/TagRepository';
import { ListTagUseCase } from './ListTagUseCase';

describe('List Tag Use Case', () => {
  let repository: TagRepository;
  let listUseCase: ListTagUseCase;

  let listTag: () => Promise<Array<TagDTO>>;

  beforeAll(() => {
    repository = new TagRepositoryImpInMemory();
    listUseCase = new ListTagUseCase(repository);

    listTag = list(listUseCase);
  });

  it('should be list all tags', async () => {
    await repository.create({
      name: 'tag1',
      description: 'description1',
    });

    await repository.create({
      name: 'tag2',
      description: 'description2',
    });

    const tags = await listTag();

    expect(tags.length).toBe(2);
  });

  const list =
    (listUseCase: ListTagUseCase) => async (): Promise<Array<TagDTO>> =>
      await listUseCase.execute();
});
