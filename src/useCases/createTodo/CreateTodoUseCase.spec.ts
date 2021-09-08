import { TodoCreateDTO, TodoDTO, TodoRepository } from "../../repositories/TodoRepository"
import { TodoRepositoryImpInMemory } from "../../repositories/inMemory/TodoRepositoryImpInMemory"
import { CreateTodoUseCase } from "./CreateTodoUseCase"

describe('Create Todo Use Case', () => {
  let repository: TodoRepository
  let createUseCase: CreateTodoUseCase
  
  let createTodo: (data: TodoCreateDTO) => Promise<TodoDTO>

  beforeAll(() => {
    repository = new TodoRepositoryImpInMemory()
    createUseCase = new CreateTodoUseCase(repository)

    createTodo = create(createUseCase)
  })

  it('should be create a new item in todo', async() => {
    const todo = await createTodo({
      title: 'First Task',
      description: 'Should be create a new item in todo',
    })

    const expectedTitle = 'First Task'
    const expectedDescription = 'Should be create a new item in todo'
    const expectedDone = false

    expect(todo).toBeTruthy()
    expect(todo.id).toBeTruthy()
    expect(todo.title).toBe(expectedTitle)
    expect(todo.description).toBe(expectedDescription)
    expect(todo.done).toBe(expectedDone)
  })

  const create = (createUseCase: CreateTodoUseCase) => 
    async ( data: TodoCreateDTO ): Promise<TodoDTO> => await createUseCase.execute(data)
  
})