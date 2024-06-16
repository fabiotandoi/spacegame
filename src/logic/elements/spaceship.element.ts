import { Position } from '../../interface/position.interface';
import { Shooter } from '../../interface/shooter.interface';
import { Size } from '../../interface/size.interface';
import { Sprite } from '../../interface/sprite.base.element';
import { Weapon } from '../../interface/weapon.interface';
import { InputHandler } from '../../utils/input';
import { Render } from '../../utils/render';

export class Spaceship extends Sprite implements Shooter {

    speedX: number = 0;
    speedY: number = 0;
    acceleration: number = 0.2;
    friction: number = 0.98;
    maxSpeed: number = 8;
    canvasWidth: number;
    canvasHeight: number;
    weapons: Weapon[] = [];
    inputHandler: InputHandler = new InputHandler();

    constructor(image: HTMLImageElement, render: Render) {
        super(image, render);
        this.canvasWidth = render.getCanvas().width;
        this.canvasHeight = render.getCanvas().height;
    }

    updatePosition() {
        let keys = this.inputHandler.keys;

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
        this.posY += this.speedY;

        this.checkCollisions();
        this.updateWeapons();
    }

    updateWeapons() {
        this.weapons.forEach(weapon => weapon.updatePosition());
        this.weapons = this.weapons.filter(weapon => !weapon.isOffScreen());
    }

    shoot(weapon: Weapon) {
        const position = <Position>{
            posX: this.posX,
            posY: this.posY - this.height / 2
        };
        const size = <Size>{
            width: 16,
            height: 32
        };
        weapon.setInitialPosition(position);
        weapon.setSize(size);
        this.weapons.push(weapon);
    }

    checkCollisions() {
        if (this.posX - this.width / 2 < 0) {
            this.posX = this.width / 2;
            this.speedX = -this.speedX;
        }

        if (this.posX + this.width / 2 > this.canvasWidth) {
            this.posX = this.canvasWidth - this.width / 2;
            this.speedX = -this.speedX;
        }

        if (this.posY - this.height / 2 < 0) {
            this.posY = this.height / 2;
            this.speedY = -this.speedY;
        }

        if (this.posY + this.height / 2 > this.canvasHeight) {
            this.posY = this.canvasHeight - this.height / 2;
            this.speedY = -this.speedY;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.posX - this.width / 2, this.posY - this.height / 2, this.width, this.height);
        this.weapons.forEach(missile => missile.draw(ctx));
    }
}
