import { TodoRepository } from "../../repositories/TodoRepository"
import { CreateTodoController } from "../../useCases/createTodo/CreateTodoController"
import { CreateTodoUseCase } from "../../useCases/createTodo/CreateTodoUseCase"
import { ListTodoController } from "../../useCases/listTodo/ListTodoController"
import { ListTodoUseCase } from "../../useCases/listTodo/ListTodoUseCase"

const createTodoController = (repository: TodoRepository) => {
  const useCase = new CreateTodoUseCase(repository)

  return new CreateTodoController(useCase)
}

const listTodoController = (repository: TodoRepository) => {
  const useCase = new ListTodoUseCase(repository)

  return new ListTodoController(useCase)
}  

export  { createTodoController, listTodoController }