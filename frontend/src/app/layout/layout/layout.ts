import { responseToDoDTO } from './../../core/dto/todo.dtos';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ToDo } from '../../core/model/todo.model';
import { MatCard, MatCardTitle, MatCardActions } from '@angular/material/card';
import { TodoService } from '../../core/service/todo.service';
import { MatFormField } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-layout',
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatCardActions,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  listTodo: responseToDoDTO[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

  currentTodoId: string | null = null;
  todoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.todoForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  ngOnInit() {
    this.loadTodos();
  }

  async loadTodos(): Promise<void> {
    try {
      const response = await this.todoService.listAllTodos();
      this.listTodo = response.body || [];
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  }

  async saveTodo(title: string, description: string) {
    try {
      if (this.currentTodoId) {
        await this.editTodo(this.currentTodoId, title, description);
      } else {
        await this.todoService.createToDo({ title, description });
      }
      this.todoForm.reset();
      this.currentTodoId = null;
      this.loadTodos();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  }

  async deleteTodo(id: string) {
    try {
      return this.todoService.deleteToDo(id).then(() => {
        this.listTodo = this.listTodo.filter((todo) => todo.id !== id);
        this.loadTodos();
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  async getToDoById(id: string): Promise<void> {
    try {
      const response = await this.todoService.findToDoById(id);
      const todo = response.body;

      if (todo) {
        this.currentTodoId = todo.id;
        this.todoForm.patchValue({
          title: todo.title,
          description: todo.description,
        });
      }
    } catch (error) {
      console.error('Error fetching todo by ID:', error);
    }
  }

  async editTodo(id: string, title: string, description: string) {
    try {
      const updateTodo = {
        title: title,
        description: description,
      };

      return this.todoService.updateToDo(id, updateTodo).then(() => {
        this.todoForm.reset();
        this.loadTodos();
      });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
}
