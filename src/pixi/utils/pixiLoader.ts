import * as PIXI from "pixi.js";

interface AssetEntry {
  alias: string;
  src: string;
}

const ASSET_MANIFEST: AssetEntry[] = [
  { alias: "card-back", src: "/assets/images/card-back.png" },
  { alias: "witch-idle", src: "/assets/images/witch-idle.png" },
  { alias: "forest-tileset", src: "/assets/images/forest-tileset.json" },
];

let loaded = false;

export async function preloadAll(onProgress?: (ratio: number) => void): Promise<void> {
  if (loaded) return;
  PIXI.Assets.addBundle("game", ASSET_MANIFEST);
  await PIXI.Assets.loadBundle("game", onProgress);
  loaded = true;
}

export function getTexture(alias: string): PIXI.Texture {
  return PIXI.Assets.get(alias) ?? PIXI.Texture.WHITE;
}

export function isLoaded(): boolean {
  return loaded;
}
