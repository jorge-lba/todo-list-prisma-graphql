import { TodoDTO } from "../../repositories/TodoRepository";
import { UpdateTodoUseCase } from "./UpdateTodoUseCase";

interface ReceivedData {
  id: number;
  title?: string;
  description?: string;
}

class UpdateTodoController {
  constructor( private readonly updateTodoUseCase: UpdateTodoUseCase ) {}

  async handle( data: ReceivedData ): Promise<TodoDTO | undefined> {
    const { id, title, description } = data;

    const todo = await this.updateTodoUseCase.execute( id, { title, description } );

    return todo
  }
}

export { UpdateTodoController };