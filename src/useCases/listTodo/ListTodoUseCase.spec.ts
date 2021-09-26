import { TagTodoRepositoryImpInMemory } from "../../repositories/inMemory/TagTodoRepositoryImpInMemory";
import { TagTodoRepository } from "../../repositories/TagTodoRepository";
import { TodoRepositoryImpInMemory } from "../../repositories/inMemory/TodoRepositoryImpInMemory";
import { TodoDTO, TodoRepository } from "../../repositories/TodoRepository";
import { ListTodoUseCase } from "./ListTodoUseCase";

describe('List Todo Use Case', () => {
  let tagTodoRepository: TagTodoRepository
  let repository: TodoRepository;
  let listUseCase: ListTodoUseCase;

  let listTodo: () => Promise<Array<TodoDTO>>;

  beforeAll(() => {
    tagTodoRepository = new TagTodoRepositoryImpInMemory();
    repository = new TodoRepositoryImpInMemory(
      tagTodoRepository
    );
    listUseCase = new ListTodoUseCase(repository);

    listTodo = list(listUseCase)
  });

  it('should be list all todo', async() => {
    await repository.create({
      title: 'Todo 1',
      description: 'Todo 1 description',
    });

    await repository.create({
      title: 'Todo 2',
      description: 'Todo 2 description',
    });

    const todo = await listTodo();

    expect(todo.length).toBe(2);
  });

  const list = (listUseCase: ListTodoUseCase) => 
    async ():Promise<Array<TodoDTO>> => await listUseCase.execute();
})