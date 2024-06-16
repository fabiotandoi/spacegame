import { Shooter } from '../../interface/shooter.interface';
import { Weapon } from '../../interface/weapon.interface';
import { InputHandler } from '../../utils/input';
import { Render } from '../../utils/render';

export class Spaceship implements Shooter {
    x: number = 0;
    y: number = 0;
    width: number = 112;
    height: number = 112;
    velocityX: number = 0;
    velocityY: number = 0;
    acceleration: number = 0.2;
    friction: number = 0.98;
    maxSpeed: number = 8;
    image: HTMLImageElement;
    canvasWidth: number;
    canvasHeight: number;
    canvas: HTMLCanvasElement;
    weapons: Weapon[] = [];
    inputHandler: InputHandler = new InputHandler();

    constructor(image: HTMLImageElement, render: Render) {
        this.image = image;
        this.canvasWidth = render.getCanvas().width;
        this.canvasHeight = render.getCanvas().height;
        this.canvas = render.getCanvas();
    }
    isOffScreen(): boolean {
        throw new Error('Method not implemented.');
    }
    getImage(): HTMLImageElement {
        throw new Error('Method not implemented.');
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
        let keys = this.inputHandler.keys;

        if (keys['ArrowUp']) this.velocityY -= this.acceleration;
        if (keys['ArrowDown']) this.velocityY += this.acceleration;
        if (keys['ArrowLeft']) this.velocityX -= this.acceleration;
        if (keys['ArrowRight']) this.velocityX += this.acceleration;

        this.velocityX *= this.friction;
        this.velocityY *= this.friction;

        const speed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        if (speed > this.maxSpeed) {
            const scale = this.maxSpeed / speed;
            this.velocityX *= scale;
            this.velocityY *= scale;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.checkCollisions();
        this.updateWeapons();        
    }

    updateWeapons() {
        this.weapons.forEach(weapon => weapon.updatePosition());
        this.weapons = this.weapons.filter(weapon => !weapon.isOffScreen());
    }

    shoot(weapon: Weapon) {
        weapon.setInitialPosition(this.x, this.y - this.height / 2);
        weapon.setSize(16, 32);
        this.weapons.push(weapon);
    }

    checkCollisions() {
        if (this.x - this.width / 2 < 0) {
            this.x = this.width / 2;
            this.velocityX = -this.velocityX;
        }

        if (this.x + this.width / 2 > this.canvasWidth) {
            this.x = this.canvasWidth - this.width / 2;
            this.velocityX = -this.velocityX;
        }

        if (this.y - this.height / 2 < 0) {
            this.y = this.height / 2;
            this.velocityY = -this.velocityY;
        }

        if (this.y + this.height / 2 > this.canvasHeight) {
            this.y = this.canvasHeight - this.height / 2;
            this.velocityY = -this.velocityY;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.weapons.forEach(missile => missile.draw(ctx));
    }
}
