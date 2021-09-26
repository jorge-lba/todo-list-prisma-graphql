import { TagRepositoryImpInMemory } from "../../repositories/inMemory/TagRepositoryImpInMemory";
import { TagTodoRepositoryImpInMemory } from "../../repositories/inMemory/TagTodoRepositoryImpInMemory";
import { TodoRepositoryImpInMemory } from "../../repositories/inMemory/TodoRepositoryImpInMemory";
import { TagRepository } from "../../repositories/TagRepository";
import { TagTodoRepository } from "../../repositories/TagTodoRepository";
import { TodoRepository } from "../../repositories/TodoRepository";

describe('Add Tags in Todo Use Case', () => {
  let tagTodoRepository: TagTodoRepository;
  let todoRepository: TodoRepository;
  let tagRepository: TagRepository;

  beforeEach(() => {
    tagTodoRepository = new TagTodoRepositoryImpInMemory();
    todoRepository = new TodoRepositoryImpInMemory(
      tagTodoRepository
    );
    tagRepository = new TagRepositoryImpInMemory();
  });

  it('should be add one tag in on todo', async () => {
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
})