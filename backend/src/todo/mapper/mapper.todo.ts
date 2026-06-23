import { ToDo } from '../entity/todo.entity';
import { TodoResponse } from '../dto/response.todo';

export class TodoMapper {
  static toResponse(todo: ToDo): TodoResponse {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
    };
  }

  static toResponseList(todos: ToDo[]): TodoResponse[] {
    return todos.map((todo) => this.toResponse(todo));
  }
}
