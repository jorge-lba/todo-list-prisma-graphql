import { TodoCreateDTO, TodoDTO, TodoRepository } from "../../repositories/TodoRepository"
import { TodoRepositoryImpInMemory } from "../../repositories/inMemory/TodoRepositoryImpInMemory"
import { CreateTodoUseCase } from "./CreateTodoUseCase"
import { TagTodoRepositoryImpInMemory } from "../../repositories/inMemory/TagTodoRepositoryImpInMemory"
import { TagTodoRepository } from "../../repositories/TagTodoRepository"

describe('Create Todo Use Case', () => {
  let tagTodoRepository: TagTodoRepository
  let repository: TodoRepository
  let createUseCase: CreateTodoUseCase
  
  let createTodo: (data: TodoCreateDTO) => Promise<TodoDTO>

  beforeAll(() => {
    tagTodoRepository = new TagTodoRepositoryImpInMemory();
    repository = new TodoRepositoryImpInMemory(
      tagTodoRepository
    );
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

  it('should not repeat an id', async () => {
    
    const {id} = await createTodo({
      title: 'Not Repeat Id',
      description: 'Should not repeat an Id',
    })
    
    await createTodo({
      title: 'Not Repeat Id',
      description: 'Should not repeat an Id',
    })

    repository.delete(id)

    const todo = await createTodo({
      title: 'Not Repeat Id',
      description: 'Should not repeat an Id',
    })

    expect(todo.id).not.toBe(id)
  })

  const create = (createUseCase: CreateTodoUseCase) => 
    async ( data: TodoCreateDTO ): Promise<TodoDTO> => await createUseCase.execute(data)
  
})