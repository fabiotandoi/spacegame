import { Sprite } from '../../interface/sprite.interface';
import { Weapon } from '../../interface/weapon.interface';
import { InputHandler } from '../../utils/input';
import { Render } from '../../utils/render';

export class Missile implements Weapon {
    x: number = 0;
    y: number = 0;
    width: number = 16;
    height: number = 32;
    velocityY: number = -5;
    image: HTMLImageElement;
    canvasHeight: number;

    constructor(image: HTMLImageElement, render: Render) {
        this.image = image;
        this.canvasHeight = render.getCanvas() .height;
    }
    inputHandler: InputHandler;
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
