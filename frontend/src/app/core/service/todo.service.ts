import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { responseToDoDTO, createToDoDTO, updateToDoDTO } from '../dto/todo.dtos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  listAllTodos(): Promise<HttpResponse<responseToDoDTO[]>> {
    return firstValueFrom(this.http.get<responseToDoDTO[]>(this.apiUrl, { observe: 'response' }));
  }

  createToDo(todo: createToDoDTO): Promise<HttpResponse<responseToDoDTO>> {
    return firstValueFrom(
      this.http.post<responseToDoDTO>(this.apiUrl, todo, { observe: 'response' }),
    );
  }

  async updateToDo(id: string, todo: updateToDoDTO): Promise<HttpResponse<responseToDoDTO>> {
    await this.findToDoById(id);
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(this.http.put<responseToDoDTO>(url, todo, { observe: 'response' }));
  }

  async deleteToDo(id: string): Promise<HttpResponse<void>> {
    try {
      await this.findToDoById(id);
    } catch (error) {
      throw new Error(`ToDo with ID ${id} not found.`);
    }
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(this.http.delete<void>(url, { observe: 'response' }));
  }

  findToDoById(id: string): Promise<HttpResponse<responseToDoDTO>> {
    try {
      const url = `${this.apiUrl}/${id}`;
      return firstValueFrom(this.http.get<responseToDoDTO>(url, { observe: 'response' }));
    } catch (error) {
      throw new Error(`ToDo with ID ${id} not found.`);
    }
  }
}
