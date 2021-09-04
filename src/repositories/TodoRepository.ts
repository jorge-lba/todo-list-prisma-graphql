interface TodoDTO {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

interface TodoRepository {
  create: () => Promise<TodoDTO>;
}

export { TodoDTO, TodoRepository };