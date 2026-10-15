import {Router} from 'express';
import {rateLimit} from 'express-rate-limit';
import {authenticateAdmin, clearAdminCookie, requireAdmin, setAdminCookie} from '../auth.js';
import type {RouteContext} from '../http/context.js';
import {asyncHandler} from '../http/errors.js';
import {routeParam} from '../http/request.js';
import {adminLoginSchema, purgeSchema, validateBody} from '../schemas.js';

export function adminRoutes({config, store, telemetry}: RouteContext): Router {
  const router = Router();
  const loginLimiter = rateLimit({
    windowMs: 15 * 60_000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  });

  router.post('/admin/verify', loginLimiter, validateBody(adminLoginSchema), (req, res) => {
    if (!config.adminSecret) {
      res.status(503).json({error: {code: 'ADMIN_DISABLED', message: 'Admin access is not configured'}});
      return;
    }
    if (!authenticateAdmin(config, req.body.key)) {
      res.status(401).json({error: {code: 'INVALID_CREDENTIALS', message: 'Invalid admin credentials'}});
      return;
    }
    setAdminCookie(config, res);
    res.json({success: true});
  });
  router.post('/admin/logout', requireAdmin, (_req, res) => {
    clearAdminCookie(config, res);
    res.status(204).end();
  });

  router.get('/telemetry/kpi', requireAdmin, asyncHandler(async (_req, res) => {
    res.json({status: 'ok', ...(await telemetry.getKPISummary())});
  }));
  router.get('/admin/metrics', requireAdmin, asyncHandler(async (_req, res) => {
    res.json(await telemetry.getKPISummary());
  }));
  router.get('/admin/sessions', requireAdmin, asyncHandler(async (_req, res) => {
    const sessions = await telemetry.getAllSessions();
    res.json({status: 'ok', count: sessions.length, sessions});
  }));
  router.get('/admin/session/:sessionId', requireAdmin, asyncHandler(async (req, res) => {
    const sessionId = routeParam(req.params.sessionId);
    const [sessionTelemetry, history] = await Promise.all([
      telemetry.getSession(sessionId),
      store.getMessages(sessionId, 100),
    ]);
    res.json({sessionId, telemetry: sessionTelemetry, ...history});
  }));
  router.delete('/admin/session/:id', requireAdmin, asyncHandler(async (req, res) => {
    res.json({success: await store.deleteSession(routeParam(req.params.id))});
  }));
  router.post('/admin/session/:id/anonymize', requireAdmin, asyncHandler(async (req, res) => {
    const anonymized = await store.anonymizeSession(routeParam(req.params.id));
    res.status(anonymized ? 200 : 404).json({success: anonymized});
  }));
  router.get('/admin/session/:id/export', requireAdmin, asyncHandler(async (req, res) => {
    const sessionId = routeParam(req.params.id);
    const data = await store.exportSession(sessionId);
    if (!data) {
      res.status(404).json({error: {code: 'NOT_FOUND', message: 'Session not found'}});
      return;
    }
    res.json({exportTimestamp: new Date().toISOString(), sessionId, ...data});
  }));
  router.post('/admin/data/purge', requireAdmin, validateBody(purgeSchema), asyncHandler(async (req, res) => {
    const cutoff = Date.now() - req.body.retentionDays * 86_400_000;
    res.json({success: true, purgedCount: await store.purgeExpired(cutoff)});
  }));
  router.get('/admin/lgpd/summary', requireAdmin, asyncHandler(async (_req, res) => {
    res.json(await telemetry.getLGPDSummary());
  }));

  return router;
}
