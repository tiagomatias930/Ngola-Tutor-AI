import {GoogleGenAI} from '@google/genai';
import {Router} from 'express';
import {rateLimit} from 'express-rate-limit';
import type {RouteContext} from '../http/context.js';
import {GeminiUnavailableError} from '../gemini.js';
import {asyncHandler} from '../http/errors.js';
import {buildLiveConfig} from '../live/session-config.js';
import {liveStartSchema, type LiveStart} from '../live/schemas.js';
import {validateBody} from '../schemas.js';

const TOKEN_API_VERSION = 'v1alpha';

/**
 * GET  /api/live        → capability probe: which transport the browser must use
 * POST /api/live/token  → short-lived, single-use Gemini token (serverless-safe)
 */
export function liveRoutes({config, gemini}: RouteContext): Router {
  const router = Router();
  const ai = config.geminiApiKey ? new GoogleGenAI({apiKey: config.geminiApiKey}) : undefined;
  const tokenLimiter = rateLimit({
    windowMs: 60_000,
    limit: config.geminiLiveConnectionsPerMinute,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, res) =>
      res.status(429).json({error: {code: 'RATE_LIMITED', message: 'Too many live sessions requested'}}),
  });

  router.get('/live', (_req, res) => {
    if (!gemini.ready) {
      res.status(503).json({error: {code: 'LIVE_DISABLED', message: 'Live voice is not configured'}});
      return;
    }
    // Serverless platforms (Vercel) cannot hold WebSocket upgrades, so the
    // browser talks to Gemini directly using a token minted below.
    res.json({enabled: true, transport: config.serverless ? 'token' : 'websocket'});
  });

  router.post('/live/token', tokenLimiter, validateBody(liveStartSchema), asyncHandler(async (req, res) => {
    if (!ai) {
      res.status(503).json({error: {code: 'LIVE_DISABLED', message: 'Live voice is not configured'}});
      return;
    }
    const start = req.body as LiveStart;
    const now = Date.now();
    const token = await (ai.authTokens.create({
      config: {
        uses: 1,
        expireTime: new Date(now + config.geminiLiveMaxDurationMs).toISOString(),
        newSessionExpireTime: new Date(now + 60_000).toISOString(),
        liveConnectConstraints: {
          model: config.geminiLiveModel,
          config: buildLiveConfig(start),
        },
        httpOptions: {apiVersion: TOKEN_API_VERSION},
      },
    })).catch((cause: unknown) => {
      console.error(JSON.stringify({
        level: 'error',
        message: 'Gemini live token request failed',
        detail: (cause instanceof Error ? cause.message : String(cause)).slice(0, 300),
      }));
      throw new GeminiUnavailableError('Live token could not be issued', {cause});
    });
    if (!token.name) {
      res.status(503).json({error: {code: 'LIVE_UNAVAILABLE', message: 'Live token could not be issued'}});
      return;
    }
    res.json({
      token: token.name,
      model: config.geminiLiveModel,
      apiVersion: TOKEN_API_VERSION,
      maxDurationMs: config.geminiLiveMaxDurationMs,
    });
  }));

  return router;
}
