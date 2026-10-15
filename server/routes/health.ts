import {Router} from 'express';
import type {RouteContext} from '../http/context.js';
import {studentSession} from '../http/request.js';

export function healthRoutes({gemini, store, config}: RouteContext): Router {
  const router = Router();

  router.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'ngola-tutor-backend',
      sessionId: studentSession(req),
      timestamp: new Date().toISOString(),
    });
  });

  router.get('/ready', (_req, res) => {
    const storeReady = store.available || store.fallbackEnabled;
    const ready = gemini.ready && storeReady;
    res.status(ready ? 200 : 503).json({
      status: ready ? 'ready' : 'degraded',
      dependencies: {
        gemini: gemini.ready ? 'ready' : 'unavailable',
        firestore: store.available ? 'ready' : store.fallbackEnabled ? 'fallback' : 'unavailable',
      },
      runtime: config.serverless ? 'serverless' : 'server',
    });
  });

  return router;
}
