import { TagDTO, TagRepository } from "repositories/TagRepository";
import { TodoDTO, TodoRepository, TodoCreateDTO, UpdateTodoDTO } from "../TodoRepository";

interface RelationTodoTagDTO {
  todoId: number;
  tagId: number;
}

class TodoRepositoryImpInMemory implements TodoRepository {
  todos: Array<TodoDTO>
  todoToTag: Array<RelationTodoTagDTO> = [];
  tagRepository: TagRepository | undefined;
  
  constructor(tagRepository?: TagRepository) {
    this.tagRepository = tagRepository;

    this.todos = new Array<TodoDTO>();
  }

  async create({
    title,
    description,
  }: TodoCreateDTO): Promise<TodoDTO> {
    const lastTodo = this.todos[this.todos.length - 1];

    const lastId = lastTodo ? lastTodo.id : 0;

    const index = await this.todos.push({
      id: lastId + 1,
      title,
      description,
      done: false
    }) - 1;

    return this.todos[index];
  }

  async findAll(): Promise<Array<TodoDTO>> {
    return this.todos;
  }

  async findById(id: number): Promise<TodoDTO | undefined> {
    const todo = this.todos.find(todo => todo.id === id);

    return todo;
  }

  async toggleDoneById(id: number): Promise<TodoDTO | undefined> {
    const index = this.todos.findIndex(todo => todo.id === id);

    if(index === -1){
      return undefined;
    }

    const todo = this.todos[index];

    todo.done = !todo.done;

    return todo;
  }

  async update(id: number, { description, title }: UpdateTodoDTO): Promise<TodoDTO | undefined> {
    const todo = this.todos.find(todo => todo.id === id);

    if(!todo){
      return undefined;
    }

    if(description) todo.description = description;
    if(title) todo.title = title;

    return todo;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.todos.findIndex(todo => todo.id === id);

    if(index === -1){
      return false;
    }

    this.todos.splice(index, 1);

    return true;
  }

  async addTags(todoId: number, tags: Array<number>): Promise<void> {
    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

    if(todoIndex < 0){
      throw new Error('Todo not found');
    }

    tags.forEach(tagId => {
      this.todoToTag.push({
        todoId,
        tagId
      })
    })

    return
  }

  async findAllTags(todoId: number): Promise<TagDTO[] | []>{
    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

    if(todoIndex < 0){
      throw new Error('Todo not found');
    }

    const tagsIds = this.todoToTag.filter(relation => relation.todoId === todoId).map(relation => relation.tagId);

    const tags = await this.tagRepository?.findAllByIds(tagsIds);

    return tags || []
  };
}

export { TodoRepositoryImpInMemory };