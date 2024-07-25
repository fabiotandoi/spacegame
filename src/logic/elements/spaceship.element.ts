import { Keys } from './../../utils/key.enum';
import { SpriteFactory } from '../../factory/sprite.factory';
import { IPosition } from '../../models/interface/position.interface';
import { IRender } from '../../models/interface/render.interface';
import { Shooter } from '../../models/interface/shooter.interface';
import { ISize } from '../../models/interface/size.interface';
import { IWeapon } from '../../models/interface/weapon.interface';
import { Sprite } from '../../models/classes/sprite.base.element';
import { ISprite } from '../../models/interface/sprite.interface';
import { SpriteAnimation } from '../../models/classes/animation.controller';
import { IInteractiveElement } from './refactor.temp.elements';


export class Spaceship extends Sprite implements Shooter {

    velocityX: number = 0;
    velocityY: number = 0;
    acceleration: number = 0.2;
    friction: number = 0.98;
    maxSpeed: number = 8;
    weapons: IWeapon[] = [];
    lastShootTime = 0;
    shootCooldown = 200; // Cooldown di 500ms
    target: ISprite;
    explotionAnimation?: SpriteAnimation;
    loadedWeapon: IWeapon;
    newWeapons: IInteractiveElement[] = [];


    constructor(image: HTMLImageElement, render: IRender) {
        super(image, render);
        this.canvasWidth = this.render.getCanvas().width;
        this.canvasHeight = render.getCanvas().height;
        this.explotionAnimation = this.spriteFactory.createAnimation();
    }

    updateSprite() {
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

        this.newWeapons.forEach(weapon => weapon.updateSprite(this.target));
        this.newWeapons = this.newWeapons.filter(weapon => !weapon.isOffScreen());
    }

    loadWeapon(weapon: IWeapon, target: ISprite) {
        this.target = target;
        this.loadedWeapon = weapon;
    }

    shoot(key: Keys) {
        if (this.inputHandler.isKeyPressed(key)) { // Controllo se la key è premuta
        const currentTime = Date.now();
        if ((currentTime - this.lastShootTime) > this.shootCooldown) {

            const position = <IPosition>{
                posX: this.posX,
                posY: this.posY - this.height / 2
            };
            const size = <ISize>{
                width: 16,
                height: 32
            };
            this.loadedWeapon = this.spriteFactory.createMissile();
            this.loadedWeapon.animation = this.explotionAnimation;
            this.loadedWeapon.phisic.setPosition(position);
            this.loadedWeapon.setSize(size);
            this.weapons.push(this.loadedWeapon);
            this.lastShootTime = currentTime;
        }
    }
    }

    newShoot(key: Keys) {
       

        if (this.inputHandler.isKeyPressed(key)) { // Controllo se la key è premuta
            const currentTime = Date.now();
            if ((currentTime - this.lastShootTime) > this.shootCooldown) {
    
                const position = <IPosition>{
                    posX: this.posX,
                    posY: this.posY - this.height / 2
                };
                const size = <ISize>{
                    width: 16,
                    height: 32
                };
                const newWeapon = this.spriteFactory.createInteractiveMissile();
                
                newWeapon.setPosition(position);
                newWeapon.setSize(size);
                this.newWeapons.push(newWeapon);
                this.lastShootTime = currentTime;
            }
        }

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
        this.newWeapons.forEach(missile => missile.draw(ctx));
        this.explotionAnimation.draw(ctx);
    }
}
