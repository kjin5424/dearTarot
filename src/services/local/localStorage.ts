import { nanoid } from "nanoid";
import type { DrawnCard, SpreadType, KarmaOption } from "@types/index";

const SESSION_PREFIX = "tarot_session_";
const DIARY_PREFIX = "diary_";

export interface TarotSession {
  id: string;
  question: string;
  spreadType: SpreadType;
  drawnCards: DrawnCard[];
  interpretation: string[];
  karmaOption: KarmaOption;
  createdAt: string;
}

export function saveSession(session: Omit<TarotSession, "id" | "createdAt">): void {
  const id = nanoid();
  const createdAt = new Date().toISOString();
  localStorage.setItem(`${SESSION_PREFIX}${id}`, JSON.stringify({ id, createdAt, ...session }));
}

export function getRecentSessions(limit = 5): TarotSession[] {
  const sessions: TarotSession[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(SESSION_PREFIX)) continue;
    const raw = localStorage.getItem(key);
    if (raw) sessions.push(JSON.parse(raw) as TarotSession);
  }

  return sessions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function clearOldSessions(daysOld = 30): void {
  const cutoff = Date.now() - daysOld * 24 * 60 * 60 * 1000;
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(SESSION_PREFIX)) continue;
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    const session = JSON.parse(raw) as TarotSession;
    if (new Date(session.createdAt).getTime() < cutoff) keysToRemove.push(key);
  }

  keysToRemove.forEach((k) => localStorage.removeItem(k));
}

export function saveDiaryEntry(text: string): void {
  const date = new Date().toISOString().slice(0, 10);
  localStorage.setItem(`${DIARY_PREFIX}${date}`, text);
}

export function getDiaryEntries(): { date: string; text: string }[] {
  const entries: { date: string; text: string }[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(DIARY_PREFIX)) continue;
    const text = localStorage.getItem(key);
    if (text) entries.push({ date: key.replace(DIARY_PREFIX, ""), text });
  }

  return entries.sort((a, b) => b.date.localeCompare(a.date));
}
