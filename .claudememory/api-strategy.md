# API / AI / 이미지 활용 전략

> src/services/api/example.md 분석 결과 (2026-03-09)

## 1. AI 해석 API 전략

### 접근 방식 (3단계)
1. **프롬프트 엔지니어링** (현재 Phase): PROMPT.ts의 시스템 프롬프트 + 상수 데이터로 AI에 지침 전달
2. **RAG** (중기): 타로 해석 DB → Vector DB → 카드 조합별 데이터 검색 → AI 프롬프트에 주입
3. **파인튜닝** (장기): LoRA/QLoRA로 오픈소스 LLM을 타로 도메인에 미세조정

### 추천 플랫폼 (비용 최적화)
| 용도 | 플랫폼 | 이유 |
|------|--------|------|
| 무료 프로토타입 | Google AI Studio (Gemini Flash) | 무료 티어 후함, 분당 제한 내 무료 |
| 속도 우선 | Groq (Llama 3.x) | 압도적 추론 속도, 무료 한도 |
| 통합 관리 | OpenRouter | 단일 API로 다중 모델 호출 |
| 한국어 특화 | FriendliAI (K-EXAONE) | LG 엑사원, 한국어 이해도 최고 |
| 자체 호스팅 | Ollama + vLLM | API 비용 0원, 서버 비용만 |

### 하이브리드 전략 (권장)
- 간단한 해석 (원카드, 데일리): 무료 모델 (Gemini Flash, Groq 무료)
- 심층 상담 (켈틱크로스): 유료 모델 (Gemini Pro, K-EXAONE)
- 캐싱: 동일 카드 조합 해석을 DB에 저장 → 비용 90%+ 절감

### 핵심 구현 사항
- OpenAI SDK 호환: base_url + api_key만 바꿔서 모든 플랫폼 사용 가능
- JSON 출력 강제: `{ card_name, interpretation, advice }` 구조화
- API 키 보호: 클라이언트 노출 금지 → 프록시 서버 or Edge Function 필수
- 환경변수: `.env`에 저장, GitHub에 올리지 않음

## 2. 이미지 소스

### 타로 카드 이미지
- **krates98/tarotcardapi**: Free Tarot Card API with Images
  - 엔드포인트: `/cards/onecard` (랜덤 1장), `/cards` (전체)
  - 라이더-웨이트 덱 이미지 제공
- **metabismuth/tarot-json**: RWS 덱 스캔
  - 350x600px, 총 7.37MB
  - MIT 라이선스 (US에서 퍼블릭 도메인)
  - tarot-images.json에 이미지 참조 포함

### 현재 TAROT_CARDS.ts 이미지 경로
- `/assets/cards/rider-waite/{id}.webp` 형식
- 에셋 미확보 상태 → Phase 7에서 다운로드 후 webp 변환 필요

## 3. 카르마(기부) 옵션

### 무료 클릭 기부 링크
- **GreaterGood 네트워크**: 매일 1회 클릭 기부
  - people-pets-planet, breast-cancer, alzheimers, literacy 등 8개 분야
- **Brother Click for the Earth**: 환경 보전 클릭 캠페인
  - 클릭당 1엔(~10원) Brother가 대신 기부

## 4. 오픈소스 LLM 후보 (자체 호스팅용)
- Llama 4 / 3.x
- Mistral / Mixtral
- DeepSeek V3 / R1
- Qwen 3 / 2.5
- Gemma 3 / 2

## 5. 파인튜닝 전략 (Ollama + vLLM 자체 모델 구축)

### 플랫폼별 출력 학습 허용 여부 (ToS 기준)
| 플랫폼 | 출력으로 학습 허용? | 비고 |
|--------|------------------|------|
| Google Gemini | ❌ 금지 | ToS 4.2: competing model 학습 명시 금지 |
| OpenAI | ❌ 금지 | ToS 2(c): 동일 조항 |
| Anthropic (Claude) | ❌ 금지 | 동일 |
| **Mistral API** | ✅ 허용 | ToS에 명시적 금지 없음 |
| **Groq** | ✅ 허용 | 오픈소스 모델 서빙, 제한 없음 |
| **Together.ai** | ✅ 허용 | 파인튜닝 파이프라인 자체 제공 |
| Ollama (로컬) | ✅ 완전 허용 | 로컬 실행 → ToS 무관 |
| HuggingFace Inference | ✅ 허용 | 오픈 모델만 해당 |

### dearTarot 권장 파인튜닝 로드맵
```
1단계 (Phase 6, 지금): Gemini Flash — 프로토타입 & UX 검증
2단계 (데이터 수집):   Together.ai 또는 Mistral API로 타로 해석 대량 생성
                       → 출력을 학습 데이터로 사용 (ToS OK)
3단계 (파인튜닝):      LoRA/QLoRA로 Qwen 2.5-7B 또는 Llama 3.2 미세조정
4단계 (서빙):          Ollama (로컬 개발) / vLLM (프로덕션 서버)
```

### Together.ai를 추천하는 이유
- Llama 3.2 / Qwen 2.5 직접 호환 (OpenAI SDK 호환 API)
- 파인튜닝 → 모델 배포 파이프라인 일체형
- 출력으로 자기 모델 학습 허용

### 핵심 원칙
- Gemini/Claude/OpenAI 출력은 학습 데이터로 절대 사용하지 않는다
- 학습 데이터는 Together.ai/Groq/Mistral 또는 직접 작성한 타로 해석으로 구성
- Gemini는 초기 검증 전용, 장기 목표는 완전 자체 모델
