import * as todoRepo from "../todo/repo";

export async function getTodos() {
  return todoRepo.getTodos();
}

export async function addTodo(description: string) {
  return todoRepo.addTodo(description);
}

export async function updateTodo(id: number, description: string) {
  return todoRepo.updateTodo(id, description);
}

export async function markTodo(id: number, isComplete: boolean) {
  return todoRepo.markTodo(id, isComplete);
}

export async function deleteTodo(id: number) {
  return todoRepo.deleteTodo(id);
}
