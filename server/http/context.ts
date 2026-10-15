import type {AppConfig} from '../config.js';
import type {DataStore} from '../data-store.js';
import type {GeminiService} from '../gemini.js';
import type {TelemetryService} from '../telemetry.js';

/** Dependencies shared by every route module. */
export interface RouteContext {
  config: AppConfig;
  store: DataStore;
  gemini: GeminiService;
  telemetry: TelemetryService;
}
