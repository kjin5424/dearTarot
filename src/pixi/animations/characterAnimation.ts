import type { WitchGirl } from "@pixi/objects/WitchGirl";

export function walkGirlTo(
  girl: WitchGirl,
  tx: number,
  ty: number,
  duration = 1.5
): Promise<void> {
  return girl.walkTo(tx, ty, duration);
}

export function talkGirl(girl: WitchGirl) {
  girl.talk();
}
