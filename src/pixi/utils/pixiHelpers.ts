// === PixiJS 유틸리티 함수 ===

// === createRect(width, height, color): PIXI.Graphics ===
// 단색 사각형 생성 (placeholder용)

// === createCircle(radius, color): PIXI.Graphics ===
// 단색 원 생성 (placeholder용)

// === centerObject(obj: PIXI.Container, stageWidth = 480, stageHeight = 270): void ===
// obj.x = (stageWidth - obj.width) / 2
// obj.y = (stageHeight - obj.height) / 2

// === fadeIn(obj: PIXI.Container, duration = 0.5): Promise<void> ===
// gsap.to(obj, { alpha: 1, duration })

// === fadeOut(obj: PIXI.Container, duration = 0.5): Promise<void> ===
// gsap.to(obj, { alpha: 0, duration })

// === pulseEffect(obj: PIXI.Container, scale = 1.1, duration = 0.8): gsap.core.Tween ===
// gsap.to(obj.scale, { x: scale, y: scale, yoyo: true, repeat: -1, duration })
// 카드 선택 힌트 등에 사용
