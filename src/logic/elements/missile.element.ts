import { Sprite } from '../../models/classes/sprite.base.element';
import { IWeapon } from '../../models/interface/weapon.interface';
import { IRender } from '../../models/interface/render.interface';
import { ISprite } from '../../models/interface/sprite.interface';

export class Missile extends Sprite implements IWeapon {

    velocityY: number = -5;
    image: HTMLImageElement;
    hitted: boolean = false;

    constructor(image: HTMLImageElement, render: IRender) {
        super(image, render);
        this.image = image;
    }

    updateSprite(target?: ISprite) {
        this.posY += this.velocityY;

        if (target && this.animation) {
            this.hit(target);
        }

    }

    isOffScreen(): boolean {
        return this.posY + this.height < 0;
    }


    hit(target: ISprite) { /* TODO: do something */
        const missileCenter = { x: this.posX + this.width / 2, y: this.posY + this.height / 2 };
        const targetCenter = { x: target.posX + target.width / 2, y: target.posY + target.height / 2 };
        const distanceSquared = (targetCenter.x - missileCenter.x) ** 2 + (targetCenter.y - missileCenter.y) ** 2;
        const radius = target.width / 2;
        const radiusSquared = radius ** 2;

        if (distanceSquared <= radiusSquared && !this.hitted) {
            this.spriteFactory.createAnimation().then((anim) => {
                this.animation = anim;
                target.destroy();
                this.animation.start(target.posX, target.posY);
                this.hitted = true;
                this.posY = -2000;
            }
            );
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.posX - this.width / 2, this.posY - this.height / 2, this.width, this.height);
    }
}
