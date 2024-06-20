import { SpriteFactory } from '../../factory/sprite.factory';
import { IPosition } from '../../models/interface/position.interface';
import { IRender } from '../../models/interface/render.interface';
import { Shooter } from '../../models/interface/shooter.interface';
import { ISize } from '../../models/interface/size.interface';
import { IWeapon } from '../../models/interface/weapon.interface';
import { Sprite } from '../../models/classes/sprite.base.element';
import { ISprite } from '../../models/interface/sprite.interface';
import { SpriteAnimation } from '../../models/classes/animation.element';


export class Spaceship extends Sprite implements Shooter {

    velocityX: number = 0;
    velocityY: number = 0;
    acceleration: number = 0.2;
    friction: number = 0.98;
    maxSpeed: number = 8;
    canvasWidth: number;
    canvasHeight: number;
    weapons: IWeapon[] = [];
    lastShootTime = 0;
    shootCooldown = 800; // Cooldown di 500ms
    target:ISprite;
    explotionAnimation?: SpriteAnimation;

    constructor(image: HTMLImageElement, render: IRender) {
        super(image, render);
        this.canvasWidth = this.render.getCanvas().width;
        this.canvasHeight = render.getCanvas().height;
        this.explotionAnimation = this.spriteFactory.createAnimation();
    }

    updateSprite() {
        /*  let keys = this.inputHandler.keys;
 
         if (keys['ArrowUp']) this.speedY -= this.acceleration;
         if (keys['ArrowDown']) this.speedY += this.acceleration;
         if (keys['ArrowLeft']) this.speedX -= this.acceleration;
         if (keys['ArrowRight']) this.speedX += this.acceleration;
 
         this.speedX *= this.friction;
         this.speedY *= this.friction;
 
         const speed = Math.sqrt(this.speedX ** 2 + this.speedY ** 2);
         if (speed > this.maxSpeed) {
             const scale = this.maxSpeed / speed;
             this.speedX *= scale;
             this.speedY *= scale;
         }
 
         this.posX += this.speedX;
         this.posY += this.speedY; */
        // Implement the logic to update the position based on the provided arguments
        if (typeof (this.onUpdate) === 'function') {
            this.onUpdate(this, this.inputHandler);
        }

        this.explotionAnimation.update(4);
        this.checkCollisions();
        this.updateWeapons();
    }

    updateWeapons() {
        this.weapons.forEach(weapon => weapon.updateSprite(this.target));
        this.weapons = this.weapons.filter(weapon => !weapon.isOffScreen());
    }

    loadWeapon(img: string, target:ISprite) {
        this.target = target;
        const currentTime = Date.now();
        if ((currentTime - this.lastShootTime) > this.shootCooldown) {
            const weapon = this.spriteFactory.createMissile();
            this.shoot(weapon);
            this.lastShootTime = currentTime;
        }
    }

    shoot(weapon: IWeapon) {
        const position = <IPosition>{
            posX: this.posX,
            posY: this.posY - this.height / 2
        };
        const size = <ISize>{
            width: 16,
            height: 32
        };
        weapon.animation = this.explotionAnimation;
        weapon.setPosition(position);
        weapon.setSize(size);
        this.weapons.push(weapon);
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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.posX - this.width / 2, this.posY - this.height / 2, this.width, this.height);
        this.weapons.forEach(missile => missile.draw(ctx));
        this.explotionAnimation.draw(ctx);
    }
}
