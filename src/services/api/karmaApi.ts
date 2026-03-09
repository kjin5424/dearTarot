import type { KarmaOption } from "@types/index";
import { saveDiaryEntry } from "@services/local/localStorage";

const KARMA_PREFIX = "karma_";

const DONATION_URLS = [
  "https://greatergood.com",
  "https://brotherclick.com",
];

interface KarmaRecord {
  date: string;
  option: KarmaOption;
  completedAt: string;
}

function todayKey(): string {
  return `${KARMA_PREFIX}${new Date().toISOString().slice(0, 10)}`;
}

export async function processKarma(option: KarmaOption, diaryText?: string): Promise<void> {
  switch (option) {
    case "DIARY":
      saveDiaryEntry(diaryText ?? "");
      break;

    case "DONATION": {
      const url = import.meta.env.VITE_DONATION_URL ?? DONATION_URLS[0];
      window.open(url, "_blank", "noopener,noreferrer");
      break;
    }

    case "AD":
      await new Promise<void>((r) => setTimeout(r, 1500));
      break;
  }

  const record: KarmaRecord = {
    date: new Date().toISOString().slice(0, 10),
    option,
    completedAt: new Date().toISOString(),
  };
  localStorage.setItem(todayKey(), JSON.stringify(record));
}

export function hasCompletedKarma(): boolean {
  return localStorage.getItem(todayKey()) !== null;
}

export function getKarmaHistory(): { date: string; option: KarmaOption }[] {
  const results: { date: string; option: KarmaOption }[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(KARMA_PREFIX)) continue;
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    const record = JSON.parse(raw) as KarmaRecord;
    results.push({ date: record.date, option: record.option });
  }

  return results.sort((a, b) => b.date.localeCompare(a.date));
}
