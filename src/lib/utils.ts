import crypto from 'crypto';
import { customAlphabet } from 'nanoid';

export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export function generateWorkspaceId() {
  const nanoid = customAlphabet(alphabet, 7);
  return `TO${nanoid(7)}`;
}

export function generateChannelId() {
  const nanoid = customAlphabet(alphabet, 7);
  return `CO${nanoid(7)}`;
}

export function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
