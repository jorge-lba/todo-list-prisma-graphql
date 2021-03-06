import { TagRepository } from '../../repositories/TagRepository';
import { TodoRepository } from '../../repositories/TodoRepository';
import { AddTagsInTodoController } from '../../useCases/addTagsInTodo/AddTagsInTodoController';
import { AddTagsInTodoUseCase } from '../../useCases/addTagsInTodo/AddTagsInTodoUseCase';
import { CreateTagController } from '../../useCases/createTag/CreateTagController';
import { CreateTagUseCase } from '../../useCases/createTag/CreateTagUseCase';
import { CreateTodoController } from '../../useCases/createTodo/CreateTodoController';
import { CreateTodoUseCase } from '../../useCases/createTodo/CreateTodoUseCase';
import { DeleteTagController } from '../../useCases/deleteTag/DeleteTagController';
import { DeleteTagUseCase } from '../../useCases/deleteTag/DeleteTagUseCase';
import { DeleteTodoController } from '../../useCases/deleteTodo/DeleteTodoController';
import { DeleteTodoUseCase } from '../../useCases/deleteTodo/DeleteTodoUseCase';
import { FindByIdTodoController } from '../../useCases/findByIdTodo/FindByIdTodoController';
import { FindByIdTodoUseCase } from '../../useCases/findByIdTodo/FindByIdTodoUseCase';
import { ListTagController } from '../../useCases/listTag/ListTagController';
import { ListTagUseCase } from '../../useCases/listTag/ListTagUseCase';
import { ListTodoController } from '../../useCases/listTodo/ListTodoController';
import { ListTodoUseCase } from '../../useCases/listTodo/ListTodoUseCase';
import { ToggleDoneTodoController } from '../../useCases/toggleDoneTodo/toggleDoneTodoController';
import { ToggleDoneTodoUseCase } from '../../useCases/toggleDoneTodo/toggleDoneTodoUseCase';
import { UpdateTagController } from '../../useCases/updateTag/UpdateTagController';
import { UpdateTagUseCase } from '../../useCases/updateTag/UpdateTagUseCase';
import { UpdateTodoController } from '../../useCases/updateTodo/UpdateTodoController';
import { UpdateTodoUseCase } from '../../useCases/updateTodo/UpdateTodoUseCase';

const createTodoController = (
  repository: TodoRepository,
): CreateTodoController => {
  const useCase = new CreateTodoUseCase(repository);

  return new CreateTodoController(useCase);
};

const createTagController = (
  repository: TagRepository,
): CreateTagController => {
  const useCase = new CreateTagUseCase(repository);

  return new CreateTagController(useCase);
};

const listTodoController = (repository: TodoRepository): ListTodoController => {
  const useCase = new ListTodoUseCase(repository);

  return new ListTodoController(useCase);
};

const listTagController = (repository: TagRepository): ListTagController => {
  const useCase = new ListTagUseCase(repository);

  return new ListTagController(useCase);
};

const findByIdController = (
  repository: TodoRepository,
): FindByIdTodoController => {
  const useCase = new FindByIdTodoUseCase(repository);

  return new FindByIdTodoController(useCase);
};

const toggleDoneTodoController = (
  repository: TodoRepository,
): ToggleDoneTodoController => {
  const useCase = new ToggleDoneTodoUseCase(repository);

  return new ToggleDoneTodoController(useCase);
};

const updateTodoController = (
  repository: TodoRepository,
): UpdateTodoController => {
  const useCase = new UpdateTodoUseCase(repository);

  return new UpdateTodoController(useCase);
};

const updateTagController = (
  repository: TagRepository,
): UpdateTagController => {
  const useCase = new UpdateTagUseCase(repository);

  return new UpdateTagController(useCase);
};

const deleteTodoController = (
  repository: TodoRepository,
): DeleteTodoController => {
  const useCase = new DeleteTodoUseCase(repository);

  return new DeleteTodoController(useCase);
};

const deleteTagController = (
  repository: TagRepository,
): DeleteTagController => {
  const useCase = new DeleteTagUseCase(repository);

  return new DeleteTagController(useCase);
};

const addTagsInTodoController = (
  repository: TodoRepository,
): AddTagsInTodoController => {
  const useCase = new AddTagsInTodoUseCase(repository);

  return new AddTagsInTodoController(useCase);
};

export {
  createTodoController,
  createTagController,
  listTodoController,
  listTagController,
  findByIdController,
  toggleDoneTodoController,
  updateTodoController,
  deleteTodoController,
  deleteTagController,
  addTagsInTodoController,
  updateTagController,
};
