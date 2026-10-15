import {createRuntime} from './bootstrap.js';
import {attachLiveProxy} from './live/proxy.js';

const {app, config, store, telemetry, gemini} = await createRuntime({serveStatic: true});

const server = app.listen(config.port, () => {
  console.log(
    JSON.stringify({
      level: 'info',
      message: 'Ngola Tutor backend started',
      port: config.port,
      firestore: store.available,
      gemini: gemini.ready,
    })
  );
});
const liveProxy = attachLiveProxy(server, config);

let shuttingDown = false;
async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(JSON.stringify({level: 'info', message: 'Shutting down', signal}));
  const forced = setTimeout(() => process.exit(1), 10_000);
  forced.unref();
  liveProxy.close();
  server.close(async error => {
    telemetry.close();
    if (store.db) await store.db.terminate().catch(() => undefined);
    clearTimeout(forced);
    process.exit(error ? 1 : 0);
  });
}

process.once('SIGTERM', () => void shutdown('SIGTERM'));
process.once('SIGINT', () => void shutdown('SIGINT'));
