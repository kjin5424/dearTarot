// import type { KarmaOption } from "~types/index";

// === 카르마 교환 처리 ===
// 현재 백엔드 없음 → localStorage 기반으로 우선 구현

// === processKarma(option: KarmaOption): Promise<void> ===
// 1. switch(option):
//    - "DIARY": 감사 일기 입력 UI 트리거 플래그 반환
//    - "DONATION": 외부 후원 링크 window.open (URL은 import.meta.env.VITE_DONATION_URL)
//    - "AD": 광고 시청 완료 플래그 저장 (실제 광고 연동 전 mock)
// 2. 카르마 완료 기록을 localStorage에 저장
// 3. 완료 후 resolve

// === hasCompletedKarma(): boolean ===
// localStorage에서 오늘 날짜 기준 카르마 완료 여부 확인

// === getKarmaHistory(): { date: string, option: KarmaOption }[] ===
// localStorage에서 전체 카르마 이력 조회
