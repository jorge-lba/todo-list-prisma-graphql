import { TagRepositoryImpInMemory } from "../../repositories/inMemory/TagRepositoryImpInMemory";
import { CreateTagDTO, TagDTO, TagRepository } from "../../repositories/TagRepository";
import { CreateTagUseCase } from "./CreateTagUseCase";

describe('Create Tag Use Case', () => {
  let repository: TagRepository;
  let createUseCase: CreateTagUseCase;

  let createTag: (data: CreateTagDTO) => Promise<TagDTO>;

  beforeEach(() => {
    repository = new TagRepositoryImpInMemory();
    createUseCase = new CreateTagUseCase(repository);

    createTag = create(createUseCase);
  })

  it('should be create a new tag', async() => {
    const tag = await createTag({
      name: 'GraphQL',
      description: 'GraphQL is a query language for APIs',
    });

    expect(tag).toBeTruthy();
    expect(tag.name).toBe('GraphQL');
    expect(tag.description).toBe('GraphQL is a query language for APIs');
  })

  const create = (createUseCase: CreateTagUseCase) => 
    async (data: CreateTagDTO): Promise<TagDTO> => await createUseCase.execute(data);
})