import { Spaceship } from './logic/elements/spaceship.element';
import { InputHandler } from './utils/input';
import { Legend } from './utils/legend';
import { SpriteFactory } from './factory/sprite.factory';
import { IDrawable } from './models/interface/drawable.interface';
import { Render } from './utils/render';
import { Keys } from './utils/key.enum';
import { IRender } from './models/interface/render.interface';
import { ISprite } from './models/interface/sprite.interface';
import { SpriteAnimation } from './models/classes/animation.element';

export class GameController {
    spaceship: Spaceship;
    enemy: ISprite;
    legend: Legend;
    drawables: IDrawable[] = [];
    render: IRender = Render.getInstance();
    spriteFactory: SpriteFactory = SpriteFactory.getInstance();
    explosionAnimation: SpriteAnimation;

    constructor() {
        this.createGame();
    }

    createGame() {

        this.spaceship = this.spriteFactory.createSpaceShip();

        this.spaceship.onUpdate = (sprite: Spaceship, input: InputHandler) => {

            if (input.isKeyPressed(Keys.ArrowUp)) sprite.moveUp();
            if (input.isKeyPressed(Keys.ArrowDown)) sprite.moveDown();
            if (input.isKeyPressed(Keys.ArrowLeft)) sprite.moveLeft();
            if (input.isKeyPressed(Keys.ArrowRight)) sprite.moveRight();

            if (input.isKeyPressed(Keys.X)) sprite.loadWeapon('static/sprites/missile.png', this.enemy);

            sprite.applyFriction();
            sprite.setMaxSpeedLimit(30);

            sprite.setPosition({ posX: sprite.posX + sprite.velocityX, posY: sprite.posY + sprite.velocityY });

        };


        this.enemy = this.spriteFactory.createSprite('static/sprites/enemy.png');

        this.enemy.onUpdate = (sprite: Spaceship, input: InputHandler) => {
            if (input.isKeyPressed(Keys.A)) sprite.moveLeft();
            if (input.isKeyPressed(Keys.D)) sprite.moveRight();
            if (input.isKeyPressed(Keys.W)) sprite.moveUp();
            if (input.isKeyPressed(Keys.S)) sprite.moveDown();
            sprite.applyFriction();
            sprite.setMaxSpeedLimit(50);
        };

        this.legend = new Legend(this.enemy);

      /*   this.animation = this.spriteFactory.createAnimation();;
        this.animation.setPosion(100, 100);
        this.animation.start(); */

        this.drawables.push(this.spaceship, this.legend, this.enemy);
        const newEnemy = Object.assign({}, this.enemy);
        newEnemy
        this.spriteFactory.spritesToDraw.push(this.spaceship, this.legend, this.enemy);


    }

    updateGame() {
        this.spaceship.updateSprite();
        this.enemy.updateSprite();
        //this.animation.update(4);
    }

    gameLoop() {
        this.updateGame();
        this.render.draw(this.spriteFactory.spritesToDraw);
        requestAnimationFrame(() => this.gameLoop());
    }
}
