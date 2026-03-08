import * as PIXI from "pixi.js";

export let app: PIXI.Application;

export async function initPixiApp(
  canvas: HTMLCanvasElement,
): Promise<PIXI.Application> {
  // 전역 스케일 모드: nearest (픽셀아트 흐림 방지)
  PIXI.TextureSource.defaultOptions.scaleMode = "nearest";

  app = new PIXI.Application();

  await app.init({
    canvas,
    width: 480,
    height: 270,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    antialias: false, // 픽셀아트는 반드시 false
    backgroundAlpha: 0, // 배경 투명 (Vue DOM이 보임)
  });

  return app;
}
