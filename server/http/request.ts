import type {Request} from 'express';
import {ForbiddenError} from './errors.js';

export function studentSession(req: Request): string {
  const issued = req.studentSessionId;
  if (!issued) throw new ForbiddenError('Student session is unavailable');
  return issued;
}

export function requireOwnedStudentSession(req: Request, requested: string): string {
  const issued = studentSession(req);
  if (requested !== issued) throw new ForbiddenError('Session does not belong to this student');
  return issued;
}

export function routeParam(value: string | string[]): string {
  return Array.isArray(value) ? value[0] ?? '' : value;
}

export function parseBoundedInteger(value: unknown, fallback: number, min: number, max: number): number {
  const parsed = typeof value === 'string' ? Number.parseInt(value, 10) : Number.NaN;
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, min), max) : fallback;
}

export function telemetryFrom(body: Record<string, unknown>) {
  return {
    locationConsent: body.locationConsent as boolean | undefined,
    cacheEnabled: body.cacheEnabled as boolean | undefined,
    country: body.country as string | undefined,
    city: body.city as string | undefined,
  };
}

export function isSameOrigin(origin: string, headers: {host?: string | string[]; 'x-forwarded-host'?: string | string[]}): boolean {
  const forwarded = headers['x-forwarded-host'];
  const raw = (Array.isArray(forwarded) ? forwarded[0] : forwarded) || headers.host;
  const host = Array.isArray(raw) ? raw[0] : raw;
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
