import path from 'node:path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {type Request} from 'express';
import helmet from 'helmet';
import {rateLimit} from 'express-rate-limit';
import {issueStudentSession} from './auth.js';
import type {AppConfig} from './config.js';
import type {DataStore} from './data-store.js';
import type {GeminiService} from './gemini.js';
import {CorsDeniedError, errorHandler, notFoundHandler} from './http/errors.js';
import {isSameOrigin} from './http/request.js';
import {adminRoutes} from './routes/admin.js';
import {chatRoutes} from './routes/chat.js';
import {healthRoutes} from './routes/health.js';
import {liveRoutes} from './routes/live.js';
import {sessionRoutes} from './routes/sessions.js';
import {TelemetryService} from './telemetry.js';

export interface AppDependencies {
  config: AppConfig;
  store: DataStore;
  gemini: GeminiService;
  telemetry?: TelemetryService;
  staticDirectory?: string;
  rateLimitMax?: number;
}

export function createApp(dependencies: AppDependencies) {
  const {config, store, gemini} = dependencies;
  const telemetry = dependencies.telemetry ?? new TelemetryService(store);
  const context = {config, store, gemini, telemetry};
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.locals.telemetry = telemetry;

  app.use(helmet());
  app.use(
    cors<Request>((req, callback) => {
      const origin = req.headers.origin;
      // The browser sends an Origin header even for same-origin POSTs. Requests
      // coming from the page this server itself served must always be allowed,
      // otherwise every deployment (and every Vercel preview URL) would need
      // its own generated URL in CORS_ORIGINS.
      if (!origin || isSameOrigin(origin, req.headers) || config.corsOrigins.includes(origin)) {
        callback(null, {credentials: true, origin: true});
        return;
      }
      callback(new CorsDeniedError());
    })
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60_000,
      limit: dependencies.rateLimitMax ?? 120,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      handler: (_req, res) =>
        res.status(429).json({error: {code: 'RATE_LIMITED', message: 'Too many requests'}}),
    })
  );
  app.use(express.json({limit: '10mb', strict: true}));
  app.use(cookieParser(config.sessionSecret));
  app.use('/api', issueStudentSession(config));

  app.use('/api', healthRoutes(context));
  app.use('/api', liveRoutes(context));
  app.use('/api', chatRoutes(context));
  app.use('/api', sessionRoutes(context));
  app.use('/api', adminRoutes(context));

  if (dependencies.staticDirectory) {
    const staticDirectory = dependencies.staticDirectory;
    app.use(express.static(staticDirectory));
    app.get('/{*splat}', (_req, res) => res.sendFile(path.join(staticDirectory, 'index.html')));
  }

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
