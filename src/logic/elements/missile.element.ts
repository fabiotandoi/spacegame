import { Position } from '../../interface/position.interface';
import { Size } from '../../interface/size.interface';
import { Sprite } from '../../interface/sprite.interface';
import { Weapon } from '../../interface/weapon.interface';
import { InputHandler } from '../../utils/input';
import { Render } from '../../utils/render';

export class Missile extends Sprite implements Weapon {

    velocityY: number = -5;
    image: HTMLImageElement;
    canvasHeight: number;

    constructor(image: HTMLImageElement, render: Render) {
        super(image, render);
        this.image = image;
        this.canvasHeight = render.getCanvas() .height;
    }
    getPosition(): Position {
        throw new Error('Method not implemented.');
    }
    getSize(): Size {
        throw new Error('Method not implemented.');
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
        this.posX = x;
        this.posY = y;
    }

    updatePosition() {
        this.posY += this.velocityY;
    }

    isOffScreen(): boolean {
        return this.posY + this.height < 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.posX - this.width / 2, this.posY - this.height / 2, this.width, this.height);
    }
}
