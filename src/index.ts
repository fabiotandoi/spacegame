import { Spaceship } from './logic/elements/spaceship.element';
import { InputHandler } from './utils/inputhandler.utils';
import { Legend } from './utils/legend';
import { SpriteFactory } from './factory/sprite.factory';
import { IDrawable } from './models/interface/drawable.interface';
import { Render } from './utils/render';
import { Keys } from './utils/key.enum';
import { IRender } from './models/interface/render.interface';
import { ISprite } from './models/interface/sprite.interface';
import { SpriteAnimation } from './models/classes/animation.element';
import { SPG } from './core/spacegame';

export class MyGame extends SPG.GameController {
    spaceship: Spaceship;
    enemy: ISprite;
    legend: Legend;
    drawables: IDrawable[] = [];
    spriteFactory: SpriteFactory = SpriteFactory.getInstance();
    explosionAnimation: SpriteAnimation;

    constructor() {
        super();
    }
    preload(): void {
        this.assetLoader.loadAsset('assets/sprites/missile.png');
        this.assetLoader.loadAsset('assets/sprites/enemy.png');
        this.assetLoader.loadAsset('assets/sprites/spaceship.png');
        this.assetLoader.loadAsset('assets/sprites/explosionblue.png');
    }

    load() {

        this.spaceship = this.spriteFactory.createSpaceShip();

        this.spaceship.onUpdate = (sprite: Spaceship, input: InputHandler) => {

            if (input.isKeyPressed(Keys.ArrowUp)) sprite.moveUp();
            if (input.isKeyPressed(Keys.ArrowDown)) sprite.moveDown();
            if (input.isKeyPressed(Keys.ArrowLeft)) sprite.moveLeft();
            if (input.isKeyPressed(Keys.ArrowRight)) sprite.moveRight();

            const weapon = this.spriteFactory.createMissile();

            if (input.isKeyPressed(Keys.X)) sprite.loadWeapon(weapon, this.enemy);

            sprite.applyFriction();
            sprite.setMaxSpeedLimit(30);

            sprite.setPosition({ posX: sprite.posX + sprite.velocityX, posY: sprite.posY + sprite.velocityY });

        };

        this.enemy = this.spriteFactory.createSprite('assets/sprites/enemy.png');

        this.enemy.onUpdate = (sprite: Spaceship, input: InputHandler) => {
            if (input.isKeyPressed(Keys.A)) sprite.moveLeft();
            if (input.isKeyPressed(Keys.D)) sprite.moveRight();
            if (input.isKeyPressed(Keys.W)) sprite.moveUp();
            if (input.isKeyPressed(Keys.S)) sprite.moveDown();
            sprite.applyFriction();
            sprite.setMaxSpeedLimit(50);
        };

        this.legend = new Legend(this.enemy);

        this.drawables.push(this.spaceship, this.legend, this.enemy);
        this.spriteFactory.spritesToDraw.push(this.spaceship, this.legend, this.enemy);

    }

    update() {
        this.spaceship.updateSprite();
        this.enemy.updateSprite();
    }

}


SPG.Game(MyGame);

