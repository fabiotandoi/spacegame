import { InputHandler } from './../../utils/inputhandler.utils';
import { Keys } from '../../utils/key.enum';
import { IPosition } from '../interface/position.interface';
import { ISprite } from '../interface/sprite.interface';
import { IInputHandler } from '../interface/inputHandler.interface';
export class PhisicController {

    private inputHandler: IInputHandler = InputHandler.getInstance();

    constructor(private sprite: ISprite) {
    }

    setPosition(position: IPosition) {
        this.sprite.posX = position.posX;
        this.sprite.posY = position.posY;
    }

    moveUp(key: Keys): void {
        if (this.inputHandler.isKeyPressed(key)) {
            this.sprite.velocityY -= this.sprite.acceleration;
            if (this.sprite.velocityY < -this.sprite.maxSpeed) {
                this.sprite.velocityY = -this.sprite.maxSpeed;
            }
        }
    }

    moveDown(key: Keys): void {
        if (this.inputHandler.isKeyPressed(key)) {
            this.sprite.velocityY += this.sprite.acceleration;
            if (this.sprite.velocityY > this.sprite.maxSpeed) {
                this.sprite.velocityY = this.sprite.maxSpeed;
            }
        }
    }

    moveLeft(key: Keys): void {
        if (this.inputHandler.isKeyPressed(key)) {
            this.sprite.velocityX -= this.sprite.acceleration;
            if (this.sprite.velocityX < -this.sprite.maxSpeed) {
                this.sprite.velocityX = -this.sprite.maxSpeed;
            }
        }
    }

    moveRight(key: Keys): void {
        if (this.inputHandler.isKeyPressed(key)) {
            this.sprite.velocityX += this.sprite.acceleration;
            if (this.sprite.velocityX > this.sprite.maxSpeed) {
                this.sprite.velocityX = this.sprite.maxSpeed;
            }
        }
    }

    applyFriction(): void {
        // Implement the logic to apply friction to the sprite
        if (this.sprite.friction > 0) {
            this.sprite.velocityX *= this.sprite.friction;
            this.sprite.velocityY *= this.sprite.friction;
        }
    }

    setMaxSpeedLimit(maxSpeed: number): void {
        const speed = Math.sqrt(this.sprite.velocityX ** 2 + this.sprite.velocityY ** 2);
        if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            this.sprite.velocityX *= scale;
            this.sprite.velocityY *= scale;
        }
    }


}   