import { Sprite } from '../../factory/sprite.interface';

export class Missile implements Sprite {
    x: number = 0;
    y: number = 0;
    width: number = 16;
    height: number = 32;
    velocityY: number = -5;
    image: HTMLImageElement;
    canvasHeight: number;

    constructor(image: HTMLImageElement, canvas: HTMLCanvasElement) {
        this.image = image;
        this.canvasHeight = canvas.height;
    }
    getImage(): HTMLImageElement {
        return this.image;
    }
    setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
    setInitialPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
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
