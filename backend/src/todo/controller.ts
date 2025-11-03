import * as todoService from "../todo/service";
import { TodoIdPathSchema, TodoSchema } from "./type.ts";
import { z } from "zod";
import { base } from "../api/base.ts";

export const getTodos = base
  .route({
    method: "GET",
    path: "/todos",
    tags: ["Todo"],
    description: "Get all todos",
    operationId: "getTodos",
  })
  .output(TodoSchema.array())
  .handler(todoService.getTodos);

export const addTodo = base
  .route({
    method: "POST",
    path: "/todos",
    tags: ["Todo"],
    description: "Add a new todo item",
    operationId: "createTodo",
  })
  .input(z.object({ description: z.string() }))
  .output(TodoSchema)
  .handler(async ({ input, errors }) => {
    const result = await todoService.addTodo(input.description);
    if (!result) {
      throw errors.INTERNAL_SERVER_ERROR();
    }
    return result;
  });

export const updateTodo = base
  .route({
    method: "PUT",
    path: "/todos/{id}",
    tags: ["Todo"],
    description: "Update the description of a todo item",
    operationId: "updateTodo",
  })
  .input(z.object({ id: TodoIdPathSchema, description: z.string() }))
  .output(TodoSchema)
  .errors({
    NOT_FOUND: { message: "Todo not found" },
  })
  .handler(async ({ input, errors }) => {
    const result = await todoService.updateTodo(input.id, input.description);
    if (!result) {
      throw errors.NOT_FOUND();
    }
    return result;
  });

export const markTodo = base
  .route({
    method: "PATCH",
    path: "/todos/{id}/mark",
    tags: ["Todo"],
    description: "Mark a todo item as complete or incomplete",
    operationId: "markTodo",
  })
  .input(z.object({ id: TodoIdPathSchema, isComplete: z.boolean() }))
  .output(TodoSchema)
  .errors({
    NOT_FOUND: { message: "Todo not found" },
  })
  .handler(async ({ input, errors }) => {
    const result = await todoService.markTodo(input.id, input.isComplete);
    if (!result) {
      throw errors.NOT_FOUND();
    }
    return result;
  });

export const deleteTodo = base
  .route({
    method: "DELETE",
    path: "/todos/{id}",
    tags: ["Todo"],
    description: "Delete a todo item",
    operationId: "deleteTodo",
  })
  .input(z.object({ id: TodoIdPathSchema }))
  .handler(async ({ input }) => {
    await todoService.deleteTodo(input.id);
  });
