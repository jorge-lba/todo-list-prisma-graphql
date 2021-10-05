import { TagRepositoryImpInMemory } from "../../repositories/inMemory/TagRepositoryImpInMemory";
import { TodoRepositoryImpInMemory } from "../../repositories/inMemory/TodoRepositoryImpInMemory";
import { TagRepository } from "../../repositories/TagRepository";
import { TodoRepository } from "../../repositories/TodoRepository";
import { AddTagsInTodoUseCase } from "./AddTagsInTodoUseCase";

describe('Add Tags in Todo Use Case', () => {
  let todoRepository: TodoRepository;
  let tagRepository: TagRepository;

  let addTagsInTodoUseCase: AddTagsInTodoUseCase;

  beforeEach(() => {
    tagRepository = new TagRepositoryImpInMemory();
    todoRepository = new TodoRepositoryImpInMemory(tagRepository);

    addTagsInTodoUseCase = new AddTagsInTodoUseCase(
      todoRepository
    )
  });

  it('should be add one tag in one todo (repositories)', async () => {
    const todo = await todoRepository.create({
      title: 'title',
      description: 'description',
    });

    const tag = await tagRepository.create({
      name: 'tag',
      description: 'description',
    });

    await todoRepository.addTags(todo.id, [tag.id])

    const tags = await todoRepository.findAllTags(todo.id);

    expect(tags.length).toBe(1);

  })

  it('should be add multiple tags in one todo', async() => {
    const todo = await todoRepository.create({
      title: 'New Todo',
      description: 'Test a new todo',
    });

    const tagsData = [
      {
        name: 'tag1',
        description: 'test tag 1',
      },
      {
        name: 'tag2',
        description: 'test tag 2',
      }
    ]

    const newTags = await Promise.all(tagsData
      .map(async tagData => await tagRepository.create(tagData))
    );

    await addTagsInTodoUseCase.execute(todo.id, newTags.map(tag => tag.id));

    const tags = await todoRepository.findAllTags(todo.id);

    const expectedTagsLength = tagsData.length;

    expect(tags.length).toBe(expectedTagsLength);
    expect(tags.map(tag => ({
      name: tag.name,
      description: tag.description,
    }))).toEqual(tagsData.map(tagData => ({
      name: tagData.name,
      description: tagData.description,
    })));
  })
})