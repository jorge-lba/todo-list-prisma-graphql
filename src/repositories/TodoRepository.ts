interface TodoDTO {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

interface Todo {
  create: () => Promise<TodoDTO>;
}