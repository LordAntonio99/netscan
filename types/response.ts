// types/server-response.ts
export type ServerSuccess<T> = {
  success: {
    content: T;
    total?: number;
  };
  error: null;
};

export type ServerError = {
  success: null;
  error: {
    status: "error" | "fail";
    statusCode: number;
    message: string;
    details?: unknown;
  };
};

export type ServerResponse<T> = ServerSuccess<T> | ServerError;
