import { TodoService } from '../service/service.todo';
import { ToDo } from '../entity/todo.entity';
import { CreateTodo } from '../dto/create.todo';
import { UpdateTodo } from '../dto/update.todo';
import { TodoMapper } from '../mapper/mapper.todo';
import { TodoResponse } from '../dto/response.todo';
import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodo: CreateTodo): Promise<TodoResponse> {
    const newTodo = await this.todoService.create(createTodo);
    return TodoMapper.toResponse(newTodo);
  }

  @Get()
  async findAll(): Promise<TodoResponse[]> {
    const todos = await this.todoService.findAll();
    return TodoMapper.toResponseList(todos);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoResponse> {
    const todo = await this.todoService.findOne(id);
    return TodoMapper.toResponse(todo);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodo: UpdateTodo,
  ): Promise<TodoResponse> {
    const update = await this.todoService.update(id, updateTodo);
    return TodoMapper.toResponse(update);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.todoService.remove(id);
  }
}
