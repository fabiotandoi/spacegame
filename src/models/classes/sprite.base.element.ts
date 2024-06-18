import { InputHandler } from "../../utils/input";
import { IPosition } from "../interface/position.interface";
import { ISize } from "../interface/size.interface";
import { IInputHandler } from "../interface/inputHandler.interface";
import { IRender } from "../interface/render.interface";
import { ISprite } from "../interface/sprite.interface";

export class Sprite implements ISprite {
    inputHandler: IInputHandler = InputHandler.getInstance();
    posX: number = 0;
    posY: number = 0;
    width: number = 0;
    height: number = 0;
    velocityX: number = 0;
    velocityY: number = 0;
    maxSpeed: number = 8;
    acceleration: number = 0.2;
    friction: number = 0.98;

    image: HTMLImageElement;
    render: IRender;
    onUpdate: (sprite: ISprite, input: IInputHandler) => void;

    constructor(image: HTMLImageElement, render: IRender) {
        this.render = render;
        this.image = image;
    }
    moveUp(): void {

        this.velocityY -= this.acceleration;
        if (this.velocityY < -this.maxSpeed) {
            this.velocityY = -this.maxSpeed;
        }
    }

    moveDown(): void {
        this.velocityY += this.acceleration;
        if (this.velocityY > this.maxSpeed) {
            this.velocityY = this.maxSpeed;
        }
    }

    moveLeft(): void {
        this.velocityX -= this.acceleration;
        if (this.velocityX < -this.maxSpeed) {
            this.velocityX = -this.maxSpeed;
        }
    }

    moveRight(): void {
        this.velocityX += this.acceleration;
        if (this.velocityX > this.maxSpeed) {
            this.velocityX = this.maxSpeed;
        }
    }

    updateSprite(...args: any[]): void {
        // Implement the logic to update the position based on the provided arguments
        if (typeof (this.onUpdate) === 'function') {
            this.onUpdate(this, this.inputHandler);
        }
    }

    setPosition(position: IPosition): void {
        this.posX = position.posX;
        this.posY = position.posY;
    }

    setSize(size: ISize): void {
        this.width = size.width;
        this.height = size.height;
    }

    getPosition(): IPosition {
        return <IPosition>{ posX: this.posX, posY: this.posY };
    }

    getSize(): ISize {
        return <ISize>{ width: this.width, height: this.height };
    }

    getImage(): HTMLImageElement {
        return this.image;
    }

    isOffScreen(): boolean {
        // Implement the logic to check if the sprite is off screen
        throw new Error('Method not implemented.');
    }

    applyFriction(): void {
        // Implement the logic to apply friction to the sprite
        if (this.friction > 0) {
            this.velocityX *= this.friction;
            this.velocityY *= this.friction;
          }
    }

    setMaxSpeedLimit(maxSpeed: number): void {
        const speed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            this.velocityX *= scale;
            this.velocityY *= scale;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}
