import crypto from 'crypto';
import { cookies } from 'next/headers';
import { getSettings } from './storage';

const ADMIN_SECRET = process.env.ADMIN_SESSION_SECRET || 'mota-refrig-secret-key-2026';
const COOKIE_NAME = 'mota_admin_session';

export function hashPassword(plain: string): string {
  return crypto.createHash('sha256').update(plain).digest('hex');
}

export function verifyAdminPassword(plain: string): boolean {
  const settings = getSettings();
  const incomingHash = hashPassword(plain);

  // Check if matches stored hash or default password
  if (settings.adminPasswordHash && incomingHash === settings.adminPasswordHash) {
    return true;
  }

  // Support plain default admin123 or mota2026 as initial fallback
  if (plain === 'admin123' || plain === 'mota2026') {
    return true;
  }

  return false;
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(timestamp).digest('hex');
  return `${timestamp}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const [timestamp, signature] = token.split('.');
    if (!timestamp || !signature) return false;

    // Check token age (max 7 days)
    const tokenTime = parseInt(timestamp, 10);
    if (Date.now() - tokenTime > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }

    const expected = crypto.createHmac('sha256', ADMIN_SECRET).update(timestamp).digest('hex');
    return signature === expected;
  } catch {
    return false;
  }
}

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return false;
  return verifySessionToken(session);
}
