


import { IPosition } from '../interface/position.interface';
import { ISprite } from '../interface/sprite.interface';
export class PhisicController {

    constructor(private sprite: ISprite) { 
    }

    setPosition(position: IPosition) {
        this.sprite.posX = position.posX;
        this.sprite.posY = position.posY;
    }

    moveUp(): void {
        this.sprite.velocityY -= this.sprite.acceleration;
        if (this.sprite.velocityY < -this.sprite.maxSpeed) {
            this.sprite.velocityY = -this.sprite.maxSpeed;
        }
    }

    moveDown(): void {
        this.sprite.velocityY += this.sprite.acceleration;
        if (this.sprite.velocityY > this.sprite.maxSpeed) {
            this.sprite.velocityY = this.sprite.maxSpeed;
        }
    }

    moveLeft(): void {
        this.sprite.velocityX -= this.sprite.acceleration;
        if (this.sprite.velocityX < -this.sprite.maxSpeed) {
            this.sprite.velocityX = -this.sprite.maxSpeed;
        }
    }

    moveRight(): void {
        this.sprite.velocityX += this.sprite.acceleration;
        if (this.sprite.velocityX > this.sprite.maxSpeed) {
            this.sprite.velocityX = this.sprite.maxSpeed;
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