import { Sprite } from '../../models/classes/sprite.base.element';
import { IWeapon } from '../../models/interface/weapon.interface';
import { IRender } from '../../models/interface/render.interface';

export class Missile extends Sprite implements IWeapon {

    velocityY: number = -5;
    image: HTMLImageElement;

    constructor(image: HTMLImageElement, render: IRender) {
        super(image, render);
        this.image = image;
    }

    updateSprite() {
        this.posY += this.velocityY;
    }

    isOffScreen(): boolean {
        return this.posY + this.height < 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.posX - this.width / 2, this.posY - this.height / 2, this.width, this.height);
    }
}
