import { TodoRepositoryImpInMemory } from '../../repositories/inMemory/TodoRepositoryImpInMemory';
import { TodoRepository } from '../../repositories/TodoRepository';
import { DeleteTodoUseCase } from './DeleteTodoUseCase';

describe('Delete Todo Use Case', () => {
  let repository: TodoRepository;
  let deleteUseCase: DeleteTodoUseCase;

  let deleteTodo: (todoId: number) => Promise<void>;

  beforeAll(() => {
    repository = new TodoRepositoryImpInMemory();
    deleteUseCase = new DeleteTodoUseCase(repository);

    deleteTodo = deleteOne(deleteUseCase);
  });

  it('should be delete one todo', async () => {
    const { id } = await repository.create({
      title: 'todo 1',
      description: 'description 1',
    });

    await deleteTodo(id);

    const todoList = await repository.findAll();

    expect(todoList.length).toBe(0);
  });

  const deleteOne =
    (deleteUseCase: DeleteTodoUseCase) => async (todoId: number) =>
      await deleteUseCase.execute(todoId);
});
