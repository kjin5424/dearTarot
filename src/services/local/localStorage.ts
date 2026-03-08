// === 로컬 세션 저장소 ===
// 타로 세션 데이터를 localStorage에 저장/복원

// --- 타입 ---
// interface TarotSession {
//   id: string;           // nanoid
//   question: string;
//   spreadType: SpreadType;
//   drawnCards: DrawnCard[];
//   interpretation: string[];
//   karmaOption: KarmaOption;
//   createdAt: string;    // ISO date
// }

// === saveSession(session: Omit<TarotSession, "id" | "createdAt">): void ===
// 1. nanoid()로 세션 ID 생성
// 2. createdAt = new Date().toISOString()
// 3. localStorage.setItem(`tarot_session_${id}`, JSON.stringify({ id, createdAt, ...session }))

// === getRecentSessions(limit = 5): TarotSession[] ===
// 1. localStorage에서 tarot_session_ 접두사 키 전부 조회
// 2. createdAt 기준 최신순 정렬
// 3. limit만큼 slice 반환

// === clearOldSessions(daysOld = 30): void ===
// 30일 이상 된 세션 자동 삭제

// === saveDiaryEntry(text: string): void ===
// 카르마 DIARY 옵션 선택 시 감사 일기 저장
// localStorage.setItem(`diary_${YYYY-MM-DD}`, text)

// === getDiaryEntries(): { date: string, text: string }[] ===
// 전체 일기 이력 조회
