import { Spaceship } from './spaceship';
import { InputHandler } from './input';
import { Legend } from './legend';
import { SpriteFactory } from './sprite.factory';
import { Sprite } from './sprite';

export class Render {
    canvas: HTMLCanvasElement = document.getElementById('gameCanvas') as HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    spaceship: Spaceship;
    inputHandler: InputHandler;
    legend: Legend;
    sprites: Sprite[] = [];
    acceleration: number;
    friction: number;
    maxSpeed: number;

    constructor(acceleration: number, friction: number, maxSpeed: number) {
        this.canvas = this.canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        const spaceshipImage = SpriteFactory.createSpaceshipImage();
        const missileImage = SpriteFactory.createMissileImage();
        this.spaceship = new Spaceship(this.canvas.width / 2, this.canvas.height / 2, spaceshipImage, missileImage, this.canvas.width, this.canvas.height);
        this.inputHandler = new InputHandler();
        this.legend = new Legend(this.spaceship);
        this.sprites.push(this.spaceship, this.legend);
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
        this.sprites.forEach(sprite => sprite.draw(this.ctx));
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}
