import { TagRepositoryImpInMemory } from "../../repositories/inMemory/TagRepositoryImpInMemory";
import { TagTodoRepositoryImpInMemory } from "../../repositories/inMemory/TagTodoRepositoryImpInMemory";
import { TodoRepositoryImpInMemory } from "../../repositories/inMemory/TodoRepositoryImpInMemory";
import { TagRepository } from "../../repositories/TagRepository";
import { TagTodoRepository } from "../../repositories/TagTodoRepository";
import { TodoRepository } from "../../repositories/TodoRepository";
import { AddTagsInPostUseCase } from "./AddTagsInTodoUseCase";

describe('Add Tags in Todo Use Case', () => {
  let tagTodoRepository: TagTodoRepository;
  let todoRepository: TodoRepository;
  let tagRepository: TagRepository;

  let addTagsInTodoUseCase: AddTagsInPostUseCase;

  beforeEach(() => {
    tagTodoRepository = new TagTodoRepositoryImpInMemory();
    todoRepository = new TodoRepositoryImpInMemory(
      tagTodoRepository
    );
    tagRepository = new TagRepositoryImpInMemory();

    addTagsInTodoUseCase = new AddTagsInPostUseCase(
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

    const relations = await tagTodoRepository.findAllByTodoId(todo.id);

    expect(relations.length).toBe(1);

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

    const tags = await Promise.all(tagsData
      .map(async tagData => await tagRepository.create(tagData))
    );

    await addTagsInTodoUseCase.execute(todo.id, tags.map(tag => tag.id));

    const relations = await tagTodoRepository.findAllByTodoId(todo.id);

    expect(relations.length).toBe(2);
  })
})