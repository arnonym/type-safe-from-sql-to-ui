import { migrateToLatest } from "./database/migrator.ts";
import { createServer } from "node:http";
import { OpenAPIHandler } from "@orpc/openapi/node";
import { CORSPlugin } from "@orpc/server/plugins";
import { ZodSmartCoercionPlugin } from "@orpc/zod";
import { getOpenApiSpecPlugin } from "./api/openapi.ts";
import { routes } from "./api/router.ts";
import { onError } from "@orpc/server";

const handler = new OpenAPIHandler(routes, {
  plugins: [
    new CORSPlugin(),
    new ZodSmartCoercionPlugin(),
    getOpenApiSpecPlugin(),
  ],
  interceptors: [onError((error) => console.error(error))],
});

const server = createServer(async (req, res) => {
  const result = await handler.handle(req, res, {
    context: { headers: req.headers },
  });
  if (!result.matched) {
    res.statusCode = 404;
    res.end("<a href='/api-docs'>OpenAPI Spec</a>");
  }
});

export async function run(): Promise<void> {
  await migrateToLatest();
  server.listen(3000, "127.0.0.1", () =>
    console.log(`Listening on http://127.0.0.1:3000`),
  );
}
