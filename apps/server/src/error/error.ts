import type { Context, ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";

import {
  type ErrorCode,
  ErrorCodeEnum,
  SchemaError,
  statusToCode,
} from "./index";

import { ZodError, z } from "zod";
import { BlankEnv } from "hono/types";

export const handleError: ErrorHandler<BlankEnv> = (err, c) => {
  console.error("[Error]", {
    name: err.name,
    message: err.message,
    path: c.req.path,
    method: c.req.method,
  });

  if (err instanceof ZodError) {
    const error = SchemaError.fromZod(err, c);
    return c.json(
      {
        code: "BAD_REQUEST",
        message: error.message,
      },
      { status: 400 }
    );
  }
  if (err instanceof HTTPException) {
    return c.json(
      {
        code: statusToCode(err.status),
        message: err.message,
      },
      { status: err.status }
    );
  }

  return c.json(
    {
      code: "INTERNAL_SERVER_ERROR",
      message: err.message ?? "Something went wrong",
    },
    { status: 500 }
  );
};

export function handleZodError(
  result:
    | {
        success: true;
        data: unknown;
      }
    | {
        success: false;
        error: ZodError;
      },
  c: Context
) {
  if (!result.success) {
    const error = SchemaError.fromZod(result.error, c);
    return c.json(
      {
        code: "BAD_REQUEST",
        message: error.message,
      },
      { status: 400 }
    );
  }
}
