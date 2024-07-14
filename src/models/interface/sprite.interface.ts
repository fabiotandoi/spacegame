import { IInputHandler } from "../interface/inputHandler.interface";
import { IRender } from "../interface/render.interface";
import { IPosition } from "../interface/position.interface";
import { ISize } from "../interface/size.interface";
import { IPhisicController } from "../classes/phisic.controller";

export interface ISprite {
  image: HTMLImageElement;
  render: IRender;
  phisic: IPhisicController;
  destroyed: boolean;

  get posX(): number;
  set posX(value: number);

  get posY(): number;
  set posY(value: number);

  get width(): number;
  set width(value: number);

  get height(): number;
  set height(value: number);

  get velocityX(): number;
  set velocityX(value: number);

  get velocityY(): number;
  set velocityY(value: number);

  get maxSpeed(): number;
  set maxSpeed(value: number);

  get acceleration(): number;
  set acceleration(value: number);

  get friction(): number;
  set friction(value: number);

  setSize(size: ISize): void;
  isOffScreen(): boolean;
  draw(ctx: CanvasRenderingContext2D): void;
  onUpdate(...args: any[]): void;
  updateSprite(...args: any[]): void;
/*   moveUp(acceleration?: number, friction?: number): void;
  moveDown(acceleration?: number, friction?: number): void;
  moveLeft(acceleration?: number, friction?: number): void;
  moveRight(acceleration?: number, friction?: number): void; */
  destroy(): void;
}
