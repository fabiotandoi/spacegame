import { Position } from '../../interface/position.interface';
import { Size } from '../../interface/size.interface';
import { SpriteBase } from '../../models/sprite.base.element';
import { Weapon } from '../../interface/weapon.interface';
import { InputHandler } from '../../utils/input';
import { Render } from '../../utils/render';

export class Missile extends SpriteBase implements Weapon {

    velocityY: number = -5;
    image: HTMLImageElement;

    constructor(image: HTMLImageElement, render: Render) {
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
