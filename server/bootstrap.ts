import path from 'node:path';
import dotenv from 'dotenv';
import {createApp} from './app.js';
import {loadConfig, type AppConfig} from './config.js';
import {connectDataStore, type DataStore} from './data-store.js';
import {ManagedGeminiService} from './gemini.js';
import {projectRoot} from './paths.js';
import {TelemetryService} from './telemetry.js';

export interface Runtime {
  app: ReturnType<typeof createApp>;
  config: AppConfig;
  store: DataStore;
  telemetry: TelemetryService;
  gemini: ManagedGeminiService;
}

/**
 * Builds the whole backend. Shared by the long-running Node entry point
 * (server/index.ts) and the Vercel serverless handler (server/vercel.ts).
 */
export async function createRuntime(options: {serveStatic?: boolean} = {}): Promise<Runtime> {
  const root = projectRoot();
  dotenv.config({path: path.join(root, '.env'), quiet: true});

  const config = loadConfig();
  const store = await connectDataStore({
    projectId: config.gcpProject,
    credentials: config.firebaseCredentials,
    // Production used to hard-fail every chat request when Firestore was not
    // configured. Degrade to bounded memory instead unless explicitly forbidden.
    allowFallback: !config.requirePersistentStore,
  });
  const telemetry = new TelemetryService(store);
  const gemini = new ManagedGeminiService(config);
  const app = createApp({
    config,
    store,
    telemetry,
    gemini,
    staticDirectory: options.serveStatic ? path.join(root, 'dist') : undefined,
  });
  return {app, config, store, telemetry, gemini};
}
