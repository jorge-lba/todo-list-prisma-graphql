import { TodoDTO, TodoRepository } from "../TodoRepository";

interface TodoCreateDTO {
  title: string;
  description: string;
}

class TodoRepositoryImpInMemory implements TodoRepository {
  todos: Array<TodoDTO>
  private static instance: TodoRepositoryImpInMemory

  private constructor() {
    this.todos = new Array<TodoDTO>();
  }

  static getInstance(): TodoRepositoryImpInMemory {
    if(!this.instance){
      this.instance = new TodoRepositoryImpInMemory();
    }
    return this.instance;
  }

  async create({
    title,
    description,
  }: TodoCreateDTO): Promise<TodoDTO> {
    const index = await this.todos.push({
      id: this.todos.length + 1,
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

  async readyById(id: number): Promise<TodoDTO | undefined> {
    const index = this.todos.findIndex(todo => todo.id === id);

    if(index === -1){
      return undefined;
    }

    const todo = this.todos[index];

    todo.done = true;

    return todo;
  }
}

export { TodoRepositoryImpInMemory };