interface TodoDTO {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

interface TodoRepository {
  create: ({ title, description }:TodoDTO) => Promise<TodoDTO>;
}

export { TodoDTO, TodoRepository };