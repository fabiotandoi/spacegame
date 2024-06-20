import { IPosition } from "./position.interface";
import { ISize } from "./size.interface";

interface IMovable {
    velocityX: number;
    velocityY: number;
    maxSpeed: number;
    acceleration: number;
    friction: number;
    updateSprite(...args: any[]): void;
    setPosition(position: IPosition): void;
    setSize(size: ISize): void;
    getPosition(): IPosition;
    getSize(): ISize;
    moveUp(acceleration: number, friction: number): void;
    moveDown(acceleration: number, friction: number): void;
    moveLeft(acceleration: number, friction: number): void;
    moveRight(acceleration: number, friction: number): void;
    checkCollision(other: IMovable): boolean;
  }