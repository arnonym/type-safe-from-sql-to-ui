import { onError, os } from "@orpc/server";

export const base = os
  .use(
    onError((error) => {
      console.log(Bun.inspect(error, { colors: true }));
    }),
  )
  .errors({
    INTERNAL_SERVER_ERROR: { message: "Internal server error" },
  });
