import crypto from 'node:crypto';
import type {NextFunction, Request, Response} from 'express';
import {DataStoreUnavailableError} from '../data-store.js';
import {GeminiUnavailableError} from '../gemini.js';

export class ForbiddenError extends Error {}

export class CorsDeniedError extends Error {
  constructor() {
    super('Origin is not allowed');
  }
}

export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    void handler(req, res, next).catch(next);
  };
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({error: {code: 'NOT_FOUND', message: 'Route not found'}});
}

export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction): void {
  const requestId = crypto.randomUUID();
  const status =
    error instanceof ForbiddenError || error instanceof CorsDeniedError
      ? 403
      : error instanceof GeminiUnavailableError || error instanceof DataStoreUnavailableError
        ? 503
        : isBodyTooLarge(error)
          ? 413
          : 500;
  const code =
    status === 403
      ? error instanceof CorsDeniedError
        ? 'CORS_DENIED'
        : 'FORBIDDEN'
      : status === 503
        ? 'DEPENDENCY_UNAVAILABLE'
        : status === 413
          ? 'PAYLOAD_TOO_LARGE'
          : 'INTERNAL_ERROR';
  const message =
    status === 500
      ? 'Internal server error'
      : status === 503
        ? 'Required service is temporarily unavailable'
        : status === 413
          ? 'Request body exceeds the size limit'
          : error instanceof Error
            ? error.message
            : 'Request failed';
  if (status >= 500) {
    console.error(JSON.stringify({level: 'error', requestId, path: req.path, error: safeError(error)}));
  }
  res.status(status).json({error: {code, message, requestId}});
}

function isBodyTooLarge(error: unknown): boolean {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'type' in error &&
      (error as {type?: string}).type === 'entity.too.large'
  );
}

function safeError(error: unknown): string {
  return error instanceof Error ? error.name : 'UnknownError';
}
