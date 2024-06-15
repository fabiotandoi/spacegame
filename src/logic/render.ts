import { Spaceship } from '../game/sprites/spaceship.sprite';
import { InputHandler } from '../utils/input';
import { Legend } from '../utils/legend';
import { SpriteFactory } from '../factory/sprite.factory';
import { Sprite } from '../factory/sprite.interface';

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
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.spaceship = SpriteFactory.createSpaceShip(this.canvas);
        this.inputHandler = new InputHandler();
        this.legend = new Legend(this.spaceship);

        this.spaceship.setInitialPosition(this.canvas.width / 2, this.canvas.height / 2);
        this.spaceship.setSize(112,112);

        let missile = SpriteFactory.createMissile(this.canvas);

        this.spaceship.addWeapon(missile);

        this.sprites.push(this.spaceship);
        
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
        this.legend.draw(this.ctx);
        this.sprites.forEach(sprite => sprite.draw(this.ctx));
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}
