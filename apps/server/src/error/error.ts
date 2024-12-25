import { ErrorHandler } from "hono";
import { BlankEnv } from "hono/types";

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export const handleError: ErrorHandler<BlankEnv> = (err, c) => {
  console.error("[Error]", {
    name: err.name,
    message: err.message,
    path: c.req.path,
    method: c.req.method,
  });

  if (err instanceof NotFoundError) {
    return c.json({ message: err.message }, 404);
  }

  if (err instanceof BadRequestError) {
    return c.json({ message: err.message }, 400);
  }

  if (err instanceof UnauthorizedError) {
    return c.json({ message: err.message }, 401);
  }

  // その他の予期せぬエラー
  return c.json({ message: "予期せぬエラーが発生しました" }, 500);
};
