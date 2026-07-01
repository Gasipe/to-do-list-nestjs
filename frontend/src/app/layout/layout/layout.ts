import { Component } from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { TodoService } from '../../core/service/todo.service';
import { ToDo } from '../../core/model/todo.model';
import { MatFormField } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [MatCard, MatCardTitle, MatFormField, MatLabel, ReactiveFormsModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  listTodo: ToDo[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

  todoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
  ) {
    this.todoForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }
}
