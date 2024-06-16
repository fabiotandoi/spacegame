import { Spaceship } from '../logic/elements/spaceship.element';

export class Legend {
    spaceship: Spaceship;

    constructor(spaceship: Spaceship) {
        this.spaceship = spaceship;
    }
    setSize(width: number, height: number): void {
        throw new Error('Method not implemented.');
    }
    setInitialPosition(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
    updatePosition(...args: any[]): void {
        throw new Error('Method not implemented.');
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`Posizione X: ${this.spaceship.x.toFixed(2)}`, 10, 20);
        ctx.fillText(`Posizione Y: ${this.spaceship.y.toFixed(2)}`, 10, 40);
        ctx.fillText(`Velocità X: ${this.spaceship.velocityX.toFixed(2)}`, 10, 60);
        ctx.fillText(`Velocità Y: ${this.spaceship.velocityY.toFixed(2)}`, 10, 80);
    }
}
/**
 * import { Spaceship } from './spaceship';
import { InputHandler } from './input';
import { Legend } from './legend';
import { Drawable } from './drawable';
import { SpriteFactory, ConcreteSpriteFactory } from './factories';

export class Render {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    spaceship: Spaceship;
    inputHandler: InputHandler;
    legend: Legend;
    drawables: Drawable[] = [];
    acceleration: number;
    friction: number;
    maxSpeed: number;
    spriteFactory: SpriteFactory;

    constructor(canvas: HTMLCanvasElement, spriteFactory: SpriteFactory, acceleration: number, friction: number, maxSpeed: number) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.spriteFactory = spriteFactory;
        this.spaceship = this.spriteFactory.createSpaceship(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
        this.inputHandler = new InputHandler();
        this.legend = new Legend(this.spaceship)
            .add('Posizione X', (obj) => obj.x.toFixed(2))
            .add('Posizione Y', (obj) => obj.y.toFixed(2))
            .add('Velocità X', (obj) => obj.velocityX.toFixed(2))
            .add('Velocità Y', (obj) => obj.velocityY.toFixed(2));

        this.drawables.push(this.spaceship, this.legend);
        this.acceleration = acceleration;
        this.friction = friction;
        this.maxSpeed = maxSpeed;
    }

    update() {
        this.spaceship.updatePosition(this.acceleration, this.friction, this.maxSpeed, this.inputHandler.keys);

        if (this.inputHandler.keys['x']) {
            this.spaceship.shoot();
            this.inputHandler.keys['x'] = false; // Prevenire il continuo sparo
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawables.forEach(drawable => drawable.draw(this.ctx));
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

 * 
 */