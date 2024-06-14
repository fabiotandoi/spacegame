import { Sprite } from './sprite';
import { Missile } from './missile';

export class Spaceship implements Sprite {
    x: number;
    y: number;
    width: number = 112;
    height: number = 112;
    velocityX: number = 0;
    velocityY: number = 0;
    image: HTMLImageElement;
    canvasWidth: number;
    canvasHeight: number;
    missiles: Missile[] = [];
    missileImage: HTMLImageElement;

    constructor(x: number, y: number, image: HTMLImageElement, missileImage: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.missileImage = missileImage;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
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
        const missile = new Missile(this.x, this.y - this.height / 2, this.missileImage, this.canvasHeight);
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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.missiles.forEach(missile => missile.draw(ctx));
    }
}
