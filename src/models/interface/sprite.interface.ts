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

  posX: number;
  posY: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  maxSpeed: number;
  acceleration: number;
  friction: number;

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
