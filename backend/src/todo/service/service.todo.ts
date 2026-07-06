import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from '../entity/todo.entity';
import { CreateTodo } from '../dto/create.todo';
import { UpdateTodo } from '../dto/update.todo';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(ToDo)
    private readonly todoRepository: Repository<ToDo>,
  ) {}

  async create(todo: CreateTodo): Promise<ToDo> {
    const newToDo = this.todoRepository.create(todo);
    return await this.todoRepository.save(newToDo);
  }

  async findAll(): Promise<ToDo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: string): Promise<ToDo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: string, updateTodo: UpdateTodo): Promise<ToDo> {
    await this.todoRepository.update(id, updateTodo);
    const updatedTodo = await this.todoRepository.findOne({ where: { id } });
    if (!updatedTodo) {
      throw new NotFoundException('Todo not found');
    }
    return updatedTodo;
  }

  async remove(id: string): Promise<void> {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
  }
}
