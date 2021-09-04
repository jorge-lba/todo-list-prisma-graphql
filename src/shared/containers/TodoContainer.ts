import { TodoRepository } from "../../repositories/TodoRepository"
import { CreateTodoController } from "../../useCases/createTodo/CreateTodoController"
import { CreateTodoUseCase } from "../../useCases/createTodo/CreateTodoUseCase"

const createTodoController = (repository: TodoRepository) => {
  const useCase = new CreateTodoUseCase(repository)

  return new CreateTodoController(useCase)
}

export  { createTodoController }