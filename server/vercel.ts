import type {IncomingMessage, ServerResponse} from 'node:http';
import {createRuntime, type Runtime} from './bootstrap.js';

let runtime: Promise<Runtime> | undefined;

/**
 * Vercel entry point. The runtime is created once per warm instance and any
 * start-up failure (bad env var, ...) is reported as JSON instead of crashing
 * the function with an opaque FUNCTION_INVOCATION_FAILED page.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    runtime ??= createRuntime();
    const {app} = await runtime;
    app(req as never, res as never);
  } catch (error) {
    runtime = undefined; // retry on the next invocation
    console.error(JSON.stringify({
      level: 'error',
      message: 'Backend failed to start',
      detail: error instanceof Error ? error.message : String(error),
    }));
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: {
        code: 'BACKEND_MISCONFIGURED',
        message: error instanceof Error ? error.message : 'Backend failed to start',
      },
    }));
  }
}
