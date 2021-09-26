import { TagDTO } from "./TagRepository";

interface TodoDTO {
  id: number;
  title: string;
  description?: string | null;
  done: boolean;
  tags?: TagDTO[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface TodoCreateDTO {
  title: string;
  description: string;
}

interface UpdateTodoDTO {
  title?: string;
  description?: string;
  tags?: TagDTO[];
}

interface TodoRepository {
  create: ({ title, description }:TodoCreateDTO) => Promise<TodoDTO>;
  findAll: () => Promise<TodoDTO[]>;
  findById: (id:number) => Promise<TodoDTO | undefined | null>;
  toggleDoneById: (id: number) => Promise<TodoDTO | undefined>;
  update: (id: number, { title, description }: UpdateTodoDTO) => Promise<TodoDTO | undefined>;
  delete: (id: number) => Promise<boolean>;
  addTags: (postId: number, tagIds: number[]) => Promise<void>;
}

export { TodoDTO, TodoRepository, TodoCreateDTO, UpdateTodoDTO };