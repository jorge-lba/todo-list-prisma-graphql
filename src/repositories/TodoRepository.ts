interface TodoDTO {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

interface TodoCreateDTO {
  title: string;
  description: string;
}

interface TodoRepository {
  create: ({ title, description }:TodoCreateDTO) => Promise<TodoDTO>;
  findAll: () => Promise<TodoDTO[]>;
  findById: (id:number) => Promise<TodoDTO | undefined>;
  toggleDoneById: (id: number) => Promise<TodoDTO | undefined>;
  update: (id: number, { title, description }: TodoDTO) => Promise<TodoDTO | undefined>;
  delete: (id: number) => Promise<boolean>;
}

export { TodoDTO, TodoRepository, TodoCreateDTO };