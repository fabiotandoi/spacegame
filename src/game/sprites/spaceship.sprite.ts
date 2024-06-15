import { Sprite } from '../../factory/sprite.interface';
import { Missile } from './missile.sprite';

export class Spaceship implements Sprite {
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
    missiles: Missile[] = [];
    missileImage: HTMLImageElement;


    constructor(image: HTMLImageElement, canvas: HTMLCanvasElement) {
        this.image = image;
        //this.missileImage = missileImage;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.canvas = canvas;
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

    updatePosition(acceleration: number, friction: number, maxSpeed: number, keys: { [key: string]: boolean }) {
        if (keys['ArrowUp']) this.velocityY -= acceleration;
        if (keys['ArrowDown']) this.velocityY += acceleration;
        if (keys['ArrowLeft']) this.velocityX -= acceleration;
        if (keys['ArrowRight']) this.velocityX += acceleration;

        this.velocityX *= friction;
        this.velocityY *= friction;

        const speed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            this.velocityX *= scale;
            this.velocityY *= scale;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.checkCollisions();
        this.updateMissiles();
    }

    updateMissiles() {
        this.missiles.forEach(missile => missile.updatePosition());
        this.missiles = this.missiles.filter(missile => !missile.isOffScreen());
    }

    shoot() {
        const missile = new Missile( this.missileImage, this.canvas);
        missile.setInitialPosition(this.x, this.y - this.height / 2);
        missile.setSize(16, 32);    
        this.missiles.push(missile);
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

    addWeapon(weapon: Sprite) {
        this.missileImage = weapon.getImage();
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.missiles.forEach(missile => missile.draw(ctx));
    }
}
