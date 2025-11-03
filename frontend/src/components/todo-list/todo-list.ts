import {Component, inject} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {CommonModule} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList {
  private todoService = inject(TodoService);

  todos = toSignal(this.todoService.getTodos(), {initialValue: []});

  markTodo(id: number, isComplete: boolean) {
    this.todoService.markTodo(id, isComplete);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
