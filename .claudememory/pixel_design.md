# 최종 스타일 & 요구사항 요약

## 전체 분위기 & 테마

- 매우 어둡고, 신비롭고, 쓸쓸한(melancholy) 감성
- 실존적·우울·몽환적·약간의 호러(존재론적 불안, 길 잃음, 외로움 중심)
- 텍스트 오버레이와 잘 어울림 
  (예: "YOU'RE SO LOST...", "YOU FEEL LIKE SHIT" 같은 내레이티브)
- 배경은 항상 숲/숲속/늪지 주변 자연 풍경
- 밝은 낮 절대 NO → 달빛이 비추는 어두운 밤이 기본 배경
- 황혼·새벽·비 오는 밤·안개 낀 밤 같은 변주 가능하지만, 기본은 달빛 밤
- 마녀, 공포, 신비로움, 오컬트

---

## 시점 & 구성

- **탑다운(Top-down) 시점** 필수
- 숲길·나무들이 깊게 들어가는 **원근감·터널링 효과** 유지 
  (vanishing point 아래쪽/중앙 아래)
- 나무는 빽빽하고 수직으로 길게 뻗어 압박감·숨 막히는 느낌
- 달빛 반사가 제한적으로 들어갈 수 있음 
  (주로 Accent 밝은 색으로 작은 포인트)
- 가끔 사슴·동물·해골 같은 서사적 오브젝트 추가 가능

---

## 색상 팔레트 (엄격히 이 색상만 사용, 다른 색 **절대** NO)

$Shadow-group-1-hex: #1a1026;\
$Shadow-group-2-hex: #220d36;\
$Shadow-group-3-hex: #2b144a;\
$Shadow-group-4-hex: #351d63;\
$Shadow-group-5-hex: #3e287d;

$Accent-witch-magic-1-hex: #7240a8;\
$Accent-witch-magic-2-hex: #a65cd4;\
$Accent-witch-magic-3-hex: #ca70da;\
$Accent-witch-magic-4-hex: #eca1f0;\
$Accent-witch-magic-5-hex: #e5ccea;\
(→ 포인트 라이트/달빛/마법 빛용)

$Ground-Soil-1-hex: #1a1026;\
$Ground-Soil-2-hex: #26163a;\
$Ground-Soil-3-hex: #372254;\
$Ground-Soil-4-hex: #4b2e6e;\
$Ground-Soil-5-hex: #62418a;

$Fog-Atmosphere-1-hex: #3a3c5c;\
$Fog-Atmosphere-2-hex: #51557d;\
$Fog-Atmosphere-3-hex: #6e7299;\
$Fog-Atmosphere-4-hex: #8a9cbc;\
$Fog-Atmosphere-5-hex: #aab7d0;\
$Fog-Atmosphere-6-hex: #c1e2e8;\
(→ 안개·먼 거리·하늘 일부)

$Fog-Atmosphere-1-rgba: rgba(58, 60, 92, 1);\
$Fog-Atmosphere-2-rgba: rgba(81, 85, 125, 1);\
$Fog-Atmosphere-3-rgba: rgba(110, 114, 153, 1);\
$Fog-Atmosphere-4-rgba: rgba(138, 156, 188, 1);\
$Fog-Atmosphere-5-rgba: rgba(170, 183, 208, 1);\
$Fog-Atmosphere-6-rgba: rgba(193, 226, 232, 1);

$Tree-Vegetation-group-1-hex: #2e1b46;\
$Tree-Vegetation-group-2-hex: #3b255e;\
$Tree-Vegetation-group-3-hex: #4e4fa6;\
$Tree-Vegetation-group-4-hex: #6b5cc6;\
$Tree-Vegetation-group-5-hex: #8a7ae0;\
$Tree-Vegetation-group-6-hex: #a49bf3;

- 전체적으로 채도 낮고 명도 매우 낮음, 퍼플/바이올렛/검정 중심의 극단적 어둠 팔레트
- **포인트 라이트(달빛, 마법 빛 등)**는 Accent 계열의 가장 밝은 쪽(#eca1f0, #e5ccea)으로 아주 드물고 작게만 사용 (작은 반짝임, 작은 반사 정도)

---

## 픽셀 스타일 & 기술

- 중저 ~ 중간 해상도 (240~480p 느낌)
- **dithering** 적극 사용 → 거칠고 텍스처감 강하게, 부드러운 그라데이션 피함
- 안티앨리어싱 거의 없거나 최소 → raw하고 레트로 게임 느낌
- 배경 요소들은 **리얼리스틱**한 묘사 추구 (형태, 질감, 구성에서 사실적·현실적인 느낌을 최대한 살림)
- 캐릭터는 배경보다 단순화 (2.5D ~ low-poly 느낌, 3~4색 정도로 추상적/심플)

---

## 필요한 픽셀 아트 오브젝트 종류

타일셋처럼 **개별적으로 분리된 형태**, 조합해서 배경 구성 가능


- 다양한 종류의 나무
  - 주로 마녀와 어울리는 침엽수 중심
  - 전나무, 가문비나무, 소나무 스타일, 죽은 나무·고목·덩굴 걸린 나무 등 변주
- 풀 / 잔디 / 덤불
  - 짧은 풀, 긴 풀, 덩굴식물, 이끼 덮인 풀 등
- 돌 / 바위 
  - 작은 돌, 큰 바위, 이끼/버섯 붙은 바위, 뾰족한 돌 등 다양한 형태
- 땅 / 흙 텍스처
  - 평평한 땅, 울퉁불퉁한 흙, 뿌리 드러난 땅, 풀 쌓인 땅 등
- 작은 꽃 
  - 퍼플/바이올렛/핑크 톤의 작은 야생화
  - 마녀스러운 독초 느낌 가능
- 버섯 (작은 버섯 군집 등)
- 하늘 / 배경 스카이
  - 기본 밤하늘
  - 별이 보이는 어두운 밤하늘
  - 안개 낀 하늘
  - 구름 레이어용
- 구름
  - 어두운 밤 구름
  - 안개처럼 흐르는 구름
  - 가벼운 안개 레이어)
- 달
  - 초승달, 보름달, 반달
  - 희미하게 빛나는 달 
  – Accent 밝은 색으로 아주 작은 포인트 라이트
- 이끼, 낙엽 더미, 뿌리, 거미줄, 작은 안개 패치 등 추가 자연 디테일

이 오브젝트들은 인벤토리 이미지처럼 각각 **개별 스프라이트**로 분리되어 있어야 하고, \**탑다운 시점**에서 자연스럽게 **타일처럼 붙여서** 배경을 만들 수 있을 정도로 **일관된 스타일 & 크기감**이어야 함.

---

## 추가 강조점
- 배경은 더 사실적인 묘사를 원함 → 형태·질감·구성에서 리얼리스틱하게 (픽셀 아트지만, 실제 숲 사진처럼 느껴지도록 디테일 살리기)
- 레트로 느낌은 dithering과 제한 팔레트로 유지하되, 형태 자체는 사실적·현실적으로