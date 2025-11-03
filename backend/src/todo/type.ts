import { z } from "zod";
import { JSON_SCHEMA_REGISTRY } from "@orpc/zod/zod4";

export const TodoIdPathSchema = z.coerce.number().int();

export const TodoSchema = z.object({
  id: z.number().int(),
  description: z.string(),
  isComplete: z.boolean(),
});

JSON_SCHEMA_REGISTRY.add(TodoSchema, {
  description: "A Todo item",
  examples: [{ id: 1, description: "Klar kommen", isComplete: false }],
});
