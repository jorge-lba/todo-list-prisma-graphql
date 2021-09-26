import { TagTodoRepositoryImpInMemory } from "../../repositories/inMemory/TagTodoRepositoryImpInMemory";
import { TagTodoRepository } from "../../repositories/TagTodoRepository";
import { TodoRepositoryImpInMemory } from "../../repositories/inMemory/TodoRepositoryImpInMemory";
import { TodoDTO, TodoRepository } from "../../repositories/TodoRepository";
import { FindByIdTodoUseCase } from "./FindByIdTodoUseCase";

describe('Find By Id Use Case', () => {
  let tagTodoRepository: TagTodoRepository
  let repository: TodoRepository;
  let findByIdUseCase: FindByIdTodoUseCase;

  let findByIdTodo: (id: number) => Promise<TodoDTO | undefined | null>;

  beforeAll(() => {
    tagTodoRepository = new TagTodoRepositoryImpInMemory();
    repository = new TodoRepositoryImpInMemory(
      tagTodoRepository
    );
    findByIdUseCase = new FindByIdTodoUseCase(repository);

    findByIdTodo = findById(findByIdUseCase);
  });

  it('should be return one todo', async () => {
    const { id } = await repository.create({
      title: 'Learn TypeScript',
      description: 'Learn TypeScript with Node.js'
    });

    const todo = await findByIdTodo(id);

    const expectedTitle = 'Learn TypeScript';
    const expectedDescription = 'Learn TypeScript with Node.js';

    expect(todo).toBeDefined();
    expect(todo!.id).toBe(id);
    expect(todo!.title).toBe(expectedTitle);
    expect(todo!.description).toBe(expectedDescription);
  })

  const findById = (findByIdUseCase: FindByIdTodoUseCase) =>
    async (id: number): Promise<TodoDTO | undefined | null> => await findByIdUseCase.execute(id);
})