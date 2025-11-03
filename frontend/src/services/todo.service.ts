import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, tap} from 'rxjs';
import {createTodo, deleteTodo, getTodos, markTodo, Todo, updateTodo} from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = new BehaviorSubject<Todo[]>([]);

  constructor() {
    this.loadTodos();
  }

  private loadTodos() {
    from(getTodos()).pipe(
      tap(response => {
        if (response.status !== 200) {
          return;
        }
        this.todos.next(response.data);
      }),
    ).subscribe();
  }

  getTodos(): Observable<Todo[]> {
    return this.todos.asObservable();
  }

  createTodo(description: string): void {
    from(createTodo({description})).pipe(
      tap(response => {
        if (response.status !== 200) {
          return;
        }
        const currentTodos = this.todos.getValue();
        this.todos.next([...currentTodos, response.data]);
      }),
    ).subscribe();
  }

  updateTodo(id: number, description: string): void {
    from(updateTodo(id, {description})).pipe(
      tap(response => {
        if (response.status !== 200) {
          return;
        }
        this.updateTodos(id, response.data);
      })
    ).subscribe();
  }

  markTodo(id: number, isComplete: boolean) {
    from(markTodo(id, {isComplete})).pipe(
      tap(response => {
        if (response.status !== 200) {
          return;
        }
        this.updateTodos(id, response.data);
      })
    ).subscribe();
  }

  deleteTodo(id: number) {
    return from(deleteTodo(id)).pipe(
      tap(response => {
        if (response.status !== 200) {
          return;
        }
        const currentTodos = this.todos.getValue();
        const updatedTodos = currentTodos.filter(todo => todo.id !== id);
        this.todos.next(updatedTodos);
      }
    )).subscribe();
  }

  private updateTodos(id: number, response: Todo) {
    const currentTodos = this.todos.getValue();
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? response : todo
    );
    this.todos.next(updatedTodos);
  }
}
