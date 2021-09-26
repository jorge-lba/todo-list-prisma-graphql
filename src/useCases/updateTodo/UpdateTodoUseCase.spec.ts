import { TagTodoRepositoryImpInMemory } from "../../repositories/inMemory/TagTodoRepositoryImpInMemory";
import { TagTodoRepository } from "../../repositories/TagTodoRepository";
import { TodoRepositoryImpInMemory } from "../../repositories/inMemory/TodoRepositoryImpInMemory";
import { TodoDTO, TodoRepository, UpdateTodoDTO } from "../../repositories/TodoRepository";
import { UpdateTodoUseCase } from "./UpdateTodoUseCase";

describe('Update Todo Use Case', () => {
  let tagTodoRepository: TagTodoRepository
  let repository: TodoRepository;
  let updateUseCase: UpdateTodoUseCase;

  let updateTodo: (todoId: number, data: UpdateTodoDTO) => Promise<TodoDTO | undefined>;

  beforeAll(() => {
    tagTodoRepository = new TagTodoRepositoryImpInMemory();
    repository = new TodoRepositoryImpInMemory(
      tagTodoRepository
    );
    updateUseCase = new UpdateTodoUseCase(repository);

    updateTodo = update(updateUseCase);
  });

  it('should be update title and description for an todo', async () => {
    const todo = await repository.create({ 
      title: 'title', 
      description: 'description' 
    });

    const result = await updateTodo(todo.id, { 
      title: 'new title', 
      description: 'new description' 
    });

    expect(result).toBeDefined();
    expect(result!.title).toBe('new title');
    expect(result!.description).toBe('new description');
  });

  const update = (updateUseCase: UpdateTodoUseCase) => 
  async (todoId: number, data: UpdateTodoDTO): Promise<TodoDTO | undefined > => await updateUseCase.execute(todoId, data);
});