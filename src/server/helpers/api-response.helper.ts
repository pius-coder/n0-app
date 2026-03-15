import { NextResponse } from "next/server";
import type { ApiResponse } from "@/shared/types";
import { AppError } from "@/server/errors";

export function success<T>(data: T, status = 200) {
  return NextResponse.json(
    { success: true, data } satisfies ApiResponse<T>,
    { status }
  );
}

export function created<T>(data: T) {
  return success(data, 201);
}

export function error(err: unknown) {
  if (err instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: err.code,
          message: err.message,
          details: err.details,
        },
      },
      { status: err.statusCode }
    );
  }

  console.error("[_n0] Unexpected error:", err);

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Une erreur inattendue est survenue",
      },
    },
    { status: 500 }
  );
}
