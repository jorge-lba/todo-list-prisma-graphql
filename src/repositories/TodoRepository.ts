interface TodoDTO {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

interface TodoRepository {
  create: ({ title, description }:TodoDTO) => Promise<TodoDTO>;
  findAll: () => Promise<TodoDTO[]>;
  findById: (id:number) => Promise<TodoDTO | undefined>;
  readyById: (id: number) => Promise<TodoDTO | undefined>;
  update: (id: number, { title, description }: TodoDTO) => Promise<TodoDTO | undefined>;
}

export { TodoDTO, TodoRepository };