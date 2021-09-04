interface TodoDTO {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

interface TodoRepository {
  create: ({ title, description }:TodoDTO) => Promise<TodoDTO>;
  findAll: () => Promise<TodoDTO[]>;
}

export { TodoDTO, TodoRepository };