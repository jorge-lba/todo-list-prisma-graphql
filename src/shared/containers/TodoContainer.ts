import { TagRepository } from "../../repositories/TagRepository"
import { TodoRepository } from "../../repositories/TodoRepository"
import { CreateTagController } from "../../useCases/createTag/CreateTagController"
import { CreateTagUseCase } from "../../useCases/createTag/CreateTagUseCase"
import { CreateTodoController } from "../../useCases/createTodo/CreateTodoController"
import { CreateTodoUseCase } from "../../useCases/createTodo/CreateTodoUseCase"
import { DeleteTodoController } from "../../useCases/deleteTodo/DeleteTodoController"
import { DeleteTodoUseCase } from "../../useCases/deleteTodo/DeleteTodoUseCase"
import { FindByIdTodoController } from "../../useCases/findByIdTodo/FindByIdTodoController"
import { FindByIdTodoUseCase } from "../../useCases/findByIdTodo/FindByIdTodoUseCase"
import { ListTodoController } from "../../useCases/listTodo/ListTodoController"
import { ListTodoUseCase } from "../../useCases/listTodo/ListTodoUseCase"
import { ToggleDoneTodoController } from "../../useCases/toggleDoneTodo/toggleDoneTodoController"
import { ToggleDoneTodoUseCase } from "../../useCases/toggleDoneTodo/toggleDoneTodoUseCase"
import { UpdateTodoController } from "../../useCases/updateTodo/UpdateTodoController"
import { UpdateTodoUseCase } from "../../useCases/updateTodo/UpdateTodoUseCase"

const createTodoController = (repository: TodoRepository) => {
  const useCase = new CreateTodoUseCase(repository)

  return new CreateTodoController(useCase)
}

const createTagController = (repository: TagRepository) => {
  const useCase = new CreateTagUseCase(repository)

  return new CreateTagController(useCase)
}

const listTodoController = (repository: TodoRepository) => {
  const useCase = new ListTodoUseCase(repository)

  return new ListTodoController(useCase)
}  

const findByIdController = (repository: TodoRepository) => {
  const useCase = new FindByIdTodoUseCase(repository)

  return new FindByIdTodoController(useCase)
}

const toggleDoneTodoController = (repository: TodoRepository) => {
  const useCase = new ToggleDoneTodoUseCase(repository)

  return new ToggleDoneTodoController(useCase)
}

const updateTodoController = (repository: TodoRepository) => {
  const useCase = new UpdateTodoUseCase(repository)

  return new UpdateTodoController(useCase)
}

const deleteTodoController = (repository: TodoRepository) => {
  const useCase = new DeleteTodoUseCase(repository)

  return new DeleteTodoController(useCase)
}
  

export  { 
  createTodoController, 
  createTagController,
  listTodoController, 
  findByIdController,
  toggleDoneTodoController, 
  updateTodoController,
  deleteTodoController 
}