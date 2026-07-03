import { Component } from '@angular/core';
import { ToDo } from '../../core/model/todo.model';
import { MatCard, MatCardTitle, MatCardActions } from '@angular/material/card';
import { TodoService } from '../../core/service/todo.service';
import { ChangeDetectorRef, inject } from '@angular/core';
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
  listTodo: ToDo[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

  todoForm: FormGroup;
  private cd = inject(ChangeDetectorRef);

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,

  ) {
    this.todoForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  ngOnInit() {
    this.loadTodos();
    }
  }

  loadTodos() {
    return this.todoService.listAllTodos().then((response) => {
      this.listTodo = response.body || [];
    });
  }

  saveTodo(title: string, description: string) {
    const createTodo = {
      title: title,
      description: description,
    };

    return this.todoService.createToDo(createTodo).then(() => {
      this.loadTodos();
      this.todoForm.reset();
    });
  }

  deleteTodo(id: string) {
    return this.todoService.deleteToDo(id).then(() => {
      this.listTodo = this.listTodo.filter((todo) => todo.id !== id);
    });
  }

  getToDoById(id: string) {
    return this.todoService.findToDoById(id).then((response) => {
      const todo = response.body;
      if (todo) {
        this.todoForm.patchValue({
          title: todo.title,
          description: todo.description,
        });
      }
    });
  }

  editTodo(id: string, title: string, description: string) {
    const updateTodo = {
      title: title,
      description: description,
    };

    return this.todoService.updateToDo(id, updateTodo).then(() => {
      this.loadTodos();
      this.todoForm.reset();
    });
  }

