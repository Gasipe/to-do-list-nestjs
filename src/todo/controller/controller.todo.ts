import { TodoService } from '../service/service.todo';
import { ToDo } from '../entity/todo.entity';
import { CreateTodo } from '../dto/create.todo';
import { UpdateTodo } from '../dto/update.todo';
import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodo: CreateTodo): Promise<ToDo> {
    return await this.todoService.create(createTodo);
  }

  @Get()
  async findAll(): Promise<ToDo[]> {
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findOne(id: string): Promise<ToDo> {
    return await this.todoService.findOne(id);
  }

  @Put(':id')
  async update(id: string, @Body() updateTodo: UpdateTodo): Promise<ToDo> {
    return await this.todoService.update(id, updateTodo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(id: string): Promise<void> {
    return await this.todoService.remove(id);
  }
}
