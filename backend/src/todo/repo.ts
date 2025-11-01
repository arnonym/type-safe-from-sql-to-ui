import { db } from "../database/database.ts";

export async function getTodos() {
  return db.selectFrom("todo").selectAll().execute();
}

export async function addTodo(description: string) {
  return db
    .insertInto("todo")
    .values({ description })
    .returningAll()
    .executeTakeFirst();
}

export async function updateTodo(id: number, description: string) {
  return db
    .updateTable("todo")
    .set({ description })
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}

export async function markTodo(id: number, isComplete: boolean) {
  return db
    .updateTable("todo")
    .set({ isComplete })
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}

export function deleteTodo(id: number) {
  return db.deleteFrom("todo").where("id", "=", id).execute();
}
