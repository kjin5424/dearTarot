// === 에셋 프리로더 ===
// 현재 에셋 없음 → placeholder-first 전략
// 에셋 완성 후 이 파일에서 로딩 관리

// === ASSET_MANIFEST ===
// { alias: string, src: string }[] 형태로 로딩 목록 정의
// 예: { alias: "witch-idle", src: "/assets/images/witch-idle.png" }
// 예: { alias: "card-back", src: "/assets/images/card-back.png" }
// 예: { alias: "forest-tileset", src: "/assets/images/forest-tileset.json" }

// === preloadAll(onProgress?: (ratio: number) => void): Promise<void> ===
// 1. PIXI.Assets.addBundle("game", ASSET_MANIFEST)
// 2. await PIXI.Assets.loadBundle("game", onProgress)
// 3. 에셋 로딩 완료 후 resolve

// === getTexture(alias: string): PIXI.Texture ===
// PIXI.Assets.get(alias) 반환
// 없으면 PIXI.Texture.WHITE 반환 (fallback placeholder)

// === isLoaded(): boolean ===
// 번들 로딩 완료 여부 확인
