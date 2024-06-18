import { IDrawable } from "./drawable.interface";

export interface IRender {
    getCanvas(): HTMLCanvasElement;
    draw(sprite: IDrawable[]): void;
  }
  