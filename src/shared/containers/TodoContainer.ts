import { TodoRepository } from "../../repositories/TodoRepository"
import { CreateTodoController } from "../../useCases/createTodo/CreateTodoController"
import { CreateTodoUseCase } from "../../useCases/createTodo/CreateTodoUseCase"
import { ListTodoController } from "../../useCases/listTodo/ListTodoController"
import { ListTodoUseCase } from "../../useCases/listTodo/ListTodoUseCase"
import { ToggleDoneTodoController } from "../../useCases/toggleDoneTodo/toggleDoneTodoController"
import ToggleDoneTodoUseCase from "../../useCases/toggleDoneTodo/toggleDoneTodoUseCase"

const createTodoController = (repository: TodoRepository) => {
  const useCase = new CreateTodoUseCase(repository)

  return new CreateTodoController(useCase)
}

const listTodoController = (repository: TodoRepository) => {
  const useCase = new ListTodoUseCase(repository)

  return new ListTodoController(useCase)
}  

const toggleDoneTodoController = (repository: TodoRepository) => {
  const useCase = new ToggleDoneTodoUseCase(repository)

  return new ToggleDoneTodoController(useCase)
}
  

export  { createTodoController, listTodoController, toggleDoneTodoController }