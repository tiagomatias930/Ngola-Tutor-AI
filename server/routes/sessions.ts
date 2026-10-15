import {Router} from 'express';
import type {RouteContext} from '../http/context.js';
import {asyncHandler} from '../http/errors.js';
import {parseBoundedInteger, requireOwnedStudentSession, routeParam, studentSession} from '../http/request.js';
import {heartbeatSchema, validateBody} from '../schemas.js';

export function sessionRoutes({store, telemetry}: RouteContext): Router {
  const router = Router();

  router.get('/sessions/:sessionId', asyncHandler(async (req, res) => {
    const sessionId = requireOwnedStudentSession(req, routeParam(req.params.sessionId));
    const limit = parseBoundedInteger(req.query.limit, 50, 1, 100);
    const cursor = typeof req.query.cursor === 'string' ? req.query.cursor.slice(0, 100) : undefined;
    const page = await store.getMessages(sessionId, limit, cursor);
    res.json({sessionId, ...page});
  }));

  router.post('/telemetry/heartbeat', validateBody(heartbeatSchema), (req, res) => {
    const sessionId = studentSession(req);
    const session = telemetry.recordHeartbeat(sessionId, req, req.body);
    res.json({
      sessionId,
      status: 'ok',
      activeDurationSeconds: session.durationSeconds,
      totalTokens: session.totalTokens,
      isOnline: true,
    });
  });

  return router;
}
