import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { TodoSchema } from "../todo/type.ts";

export const getOpenApiSpecPlugin = () =>
  new OpenAPIReferencePlugin({
    schemaConverters: [new ZodToJsonSchemaConverter()],
    specGenerateOptions: {
      info: {
        title: "Todo API",
        version: "0.0.1",
      },
      commonSchemas: {
        Todo: {
          schema: TodoSchema,
        },
      },
    },
    docsPath: "/api-docs/",
    specPath: "/api-docs/json",
  });
