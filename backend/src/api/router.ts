import * as todoController from "../todo/controller";

export const routes = {
  todo: {
    get: todoController.getTodos,
    update: todoController.updateTodo,
    add: todoController.addTodo,
    mark: todoController.markTodo,
    delete: todoController.deleteTodo,
  },
};
