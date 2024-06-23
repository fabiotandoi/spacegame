import { InputHandler } from "../../utils/input";
import { IPosition } from "../interface/position.interface";
import { ISize } from "../interface/size.interface";
import { IInputHandler } from "../interface/inputHandler.interface";
import { IRender } from "../interface/render.interface";
import { ISprite } from "../interface/sprite.interface";
import { SpriteFactory } from "../../factory/sprite.factory";
import { SpriteAnimation } from "./animation.element";

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
    spriteFactory = SpriteFactory.getInstance();
    spriteId = Math.random();

    canvasHeight: number;
    canvasWidth: number;

    image: HTMLImageElement;
    render: IRender;
    onUpdate: (sprite: ISprite, input: IInputHandler) => void;
    animation?: SpriteAnimation;

    constructor(image: HTMLImageElement, render: IRender) {
        this.render = render;
        this.image = image;
        this.canvasWidth = this.render.getCanvas().width;
        this.canvasHeight = render.getCanvas().height;
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
        };

        this.checkCollisions();


        this.setPosition({ posX: this.posX + this.velocityX, posY: this.posY + this.velocityY });
    }

    setPosition(position: IPosition): void {
        this.posX = position.posX;
        this.posY = position.posY;
    }

    setSize(size: ISize): void {
        this.width = size.width;
        this.height = size.height;
    }

    checkCollisions() {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;

        if (this.posX - halfWidth < 0) {
            this.posX = halfWidth;
            this.velocityX = -this.velocityX;
        }

        if (this.posX + halfWidth > this.canvasWidth) {
            this.posX = this.canvasWidth - halfWidth;
            this.velocityX = -this.velocityX;
        }

        if (this.posY - halfHeight < 0) {
            this.posY = halfHeight;
            this.velocityY = -this.velocityY;
        }

        if (this.posY + halfHeight > this.canvasHeight) {
            this.posY = this.canvasHeight - halfHeight;
            this.velocityY = -this.velocityY;
        }
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

    destroy(): void {
        this.spriteFactory.spritesToDraw = this.spriteFactory.spritesToDraw.filter((sprite) => sprite.spriteId !== this.spriteId);
        setTimeout(() => {
            this.setPosition({ posX: 0, posY: 0 });

            const minX = Math.ceil(0);
            const maxX = Math.floor(this.canvasWidth - (this.width));
            const randomX = Math.floor(Math.random() * (maxX - minX + 1) + minX);

            const minY = Math.ceil(0);
            const maxY = Math.floor(this.canvasHeight/3);
            
            const randomY = Math.floor(Math.random() * (maxY - minY + 1) + minY);
            this.setPosition({ posX: randomX, posY: randomY });

            this.spriteFactory.spritesToDraw.push(this);

        }, 1300);
    }
}
