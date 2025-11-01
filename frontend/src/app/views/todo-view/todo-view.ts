import {Component} from '@angular/core';
import {TodoList} from '../../../components/todo-list/todo-list';
import {AddTodo} from '../../../components/add-todo/add-todo';

@Component({
  selector: 'app-todo-view',
  imports: [
    TodoList,
    AddTodo
  ],
  templateUrl: './todo-view.html',
  styleUrl: './todo-view.scss'
})
export class TodoView {
}
