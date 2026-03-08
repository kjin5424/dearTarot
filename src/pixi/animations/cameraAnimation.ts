import type { Camera } from "@pixi/Camera";

export function panCamera(camera: Camera, y: number, duration: number): Promise<void> {
  return camera.moveTo(y, duration);
}

export function resetCamera(camera: Camera) {
  camera.reset();
}
