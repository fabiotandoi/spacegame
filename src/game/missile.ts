import { Sprite } from './sprite';

export class Missile implements Sprite {
    x: number;
    y: number;
    width: number = 16;
    height: number = 32;
    velocityY: number = -5;
    image: HTMLImageElement;
    canvasHeight: number;

    constructor(x: number, y: number, image: HTMLImageElement, canvasHeight: number) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.canvasHeight = canvasHeight;
    }

    updatePosition() {
        this.y += this.velocityY;
    }

    isOffScreen(): boolean {
        return this.y + this.height < 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
