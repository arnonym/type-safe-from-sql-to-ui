import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss'
})
export class AddTodo {
  private todoService = inject(TodoService);

  newTodoDescription = '';

  async addTodo() {
    this.todoService.createTodo(this.newTodoDescription.trim());
    this.newTodoDescription = '';
  }
}
