// PIXI.Container 상속
// 모든 씬의 추상 베이스 클래스
import * as PIXI from "pixi.js";

export abstract class BaseScene extends PIXI.Container {
  abstract enter(): Promise<void>;
  abstract exit(): Promise<void>;
}
