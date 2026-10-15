import crypto from 'node:crypto';

export interface AppConfig {
  port: number;
  nodeEnv: string;
  sessionSecret: string;
  adminSecret?: string;
  corsOrigins: string[];
  geminiApiKey?: string;
  gcpProject?: string;
  /** Running on a serverless platform (Vercel): no WebSockets, no local disk, no long timers. */
  serverless: boolean;
  /** Parsed service-account JSON for Firestore when no ambient GCP credentials exist. */
  firebaseCredentials?: {project_id?: string; client_email: string; private_key: string};
  /** Refuse to start on the in-memory store (default: allow, with a warning). */
  requirePersistentStore: boolean;
  geminiTextModel: string;
  geminiImageModel: string;
  geminiTimeoutMs: number;
  geminiConcurrency: number;
  geminiRetries: number;
  enableSearch: boolean;
  geminiLiveModel: string;
  geminiLiveMaxDurationMs: number;
  geminiLiveSessionsPerIp: number;
  geminiLiveMaxSessions: number;
  geminiLiveConnectionsPerMinute: number;
}

function integer(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseServiceAccount(raw: string | undefined): AppConfig['firebaseCredentials'] {
  const value = raw?.trim();
  if (!value) return undefined;
  try {
    const json = value.startsWith('{') ? value : Buffer.from(value, 'base64').toString('utf8');
    const parsed = JSON.parse(json) as {project_id?: string; client_email?: string; private_key?: string};
    if (!parsed.client_email || !parsed.private_key) return undefined;
    return {
      project_id: parsed.project_id,
      client_email: parsed.client_email,
      // Vercel/.env files often store the key with escaped newlines.
      private_key: parsed.private_key.replace(/\\n/g, '\n'),
    };
  } catch {
    console.warn('FIREBASE_SERVICE_ACCOUNT is set but is not valid JSON/base64 JSON; ignoring it');
    return undefined;
  }
}

function resolveSessionSecret(env: NodeJS.ProcessEnv, nodeEnv: string): string {
  const configured = env.SESSION_SECRET?.trim();
  if (configured && configured.length >= 32) return configured;
  if (nodeEnv !== 'production') return crypto.randomBytes(32).toString('hex');
  // Serverless instances must agree on the cookie secret. When SESSION_SECRET
  // is missing, derive a stable one from another private value instead of
  // taking the whole deployment down.
  const seed = env.ADMIN_SECRET?.trim() || env.GEMINI_API_KEY?.trim();
  if (seed) {
    console.warn('SESSION_SECRET missing or shorter than 32 chars; deriving one. Set SESSION_SECRET explicitly.');
    return crypto.createHmac('sha256', seed).update('ngola-tutor-session-secret').digest('hex');
  }
  throw new Error('SESSION_SECRET must be at least 32 characters in production');
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const nodeEnv = env.NODE_ENV ?? 'development';
  const serverless = env.VERCEL === '1' || Boolean(env.AWS_LAMBDA_FUNCTION_NAME);

  return {
    port: integer(env.PORT, 8080),
    nodeEnv,
    sessionSecret: resolveSessionSecret(env, nodeEnv),
    serverless,
    requirePersistentStore: env.REQUIRE_PERSISTENT_STORE === 'true',
    adminSecret: env.ADMIN_SECRET?.trim() || undefined,
    corsOrigins: (env.CORS_ORIGINS ?? 'http://localhost:5173,http://localhost:3000')
      .split(',')
      .map(value => value.trim())
      .filter(Boolean),
    geminiApiKey: env.GEMINI_API_KEY?.trim() || undefined,
    gcpProject: env.GOOGLE_CLOUD_PROJECT?.trim() || undefined,
    firebaseCredentials: parseServiceAccount(env.FIREBASE_SERVICE_ACCOUNT),
    geminiTextModel: env.GEMINI_TEXT_MODEL?.trim() || 'gemini-3.6-flash',
    geminiImageModel: env.GEMINI_IMAGE_MODEL?.trim() || 'gemini-2.5-flash-image',
    geminiTimeoutMs: integer(env.GEMINI_TIMEOUT_MS, 20_000),
    geminiConcurrency: integer(env.GEMINI_CONCURRENCY, 4),
    geminiRetries: Math.min(integer(env.GEMINI_RETRIES, 2), 4),
    enableSearch: env.GEMINI_ENABLE_SEARCH === 'true',
    geminiLiveModel: env.GEMINI_LIVE_MODEL?.trim() || 'gemini-2.5-flash-native-audio-latest',
    geminiLiveMaxDurationMs: Math.min(integer(env.GEMINI_LIVE_MAX_DURATION_MS, 30 * 60_000), 60 * 60_000),
    geminiLiveSessionsPerIp: Math.min(integer(env.GEMINI_LIVE_SESSIONS_PER_IP, 2), 5),
    geminiLiveMaxSessions: Math.min(integer(env.GEMINI_LIVE_MAX_SESSIONS, 20), 100),
    geminiLiveConnectionsPerMinute: Math.min(integer(env.GEMINI_LIVE_CONNECTIONS_PER_MINUTE, 6), 30),
  };
}
