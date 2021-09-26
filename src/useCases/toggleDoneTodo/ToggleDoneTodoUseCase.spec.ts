import { TagTodoRepositoryImpInMemory } from "../../repositories/inMemory/TagTodoRepositoryImpInMemory";
import { TagTodoRepository } from "../../repositories/TagTodoRepository";
import { TodoRepositoryImpInMemory } from "../../repositories/inMemory/TodoRepositoryImpInMemory";
import { TodoDTO, TodoRepository } from "../../repositories/TodoRepository";
import { ToggleDoneTodoUseCase } from "./toggleDoneTodoUseCase";

describe('Toggle Done Todo Use Case', () => {
  let tagTodoRepository: TagTodoRepository
  let repository: TodoRepository;
  let toggleDoneUseCase: ToggleDoneTodoUseCase;

  let toggleDoneTodo: (todoId: number) => Promise<TodoDTO | undefined>;

  beforeAll(() => {
    tagTodoRepository = new TagTodoRepositoryImpInMemory();
    repository = new TodoRepositoryImpInMemory(
      tagTodoRepository
    );
    toggleDoneUseCase = new ToggleDoneTodoUseCase(repository);

    toggleDoneTodo = toggleDone(toggleDoneUseCase);
  });

  it('should be changed state done the todo', async () => {
    const { id } = await repository.create({
      title: 'Todo 1',
      description: 'Todo 1 description',
    });

    const todo = await toggleDoneTodo(id);

    expect(todo!.done).toBeTruthy();
    expect(todo!.done).toBe(true);
  });

  const toggleDone = (toggleDoneUseCase: ToggleDoneTodoUseCase) => 
    async (todoId: number) => await toggleDoneUseCase.execute(todoId);
});