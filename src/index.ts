import { Spaceship } from './logic/elements/spaceship.element';
import { InputHandler } from './utils/inputhandler.utils';
import { Legend } from './utils/legend';
import { SpriteFactory } from './factory/sprite.factory';
import { IDrawable } from './models/interface/drawable.interface';
import { Keys } from './utils/key.enum';
import { ISprite } from './models/interface/sprite.interface';
import { SpriteAnimation } from './models/classes/animation.controller';
import { SPG } from './core/spacegame';
import { IWeapon } from './models/interface/weapon.interface';

export class MyGame extends SPG.GameController {
    spaceship: Spaceship;
    enemy: ISprite;
    legend: Legend;
    spriteFactory: SpriteFactory = SpriteFactory.getInstance();
    explosionAnimation: SpriteAnimation;
    weapon: IWeapon;

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
        this.enemy = this.spriteFactory.createSprite('assets/sprites/enemy.png');
        this.weapon = this.spriteFactory.createMissile();

        this.spaceship.loadWeapon(this.weapon, this.enemy);

        this.spaceship.onUpdate = (sprite: Spaceship) => {

            sprite.phisic.moveUp(Keys.ArrowUp);
            sprite.phisic.moveDown(Keys.ArrowDown);
            sprite.phisic.moveLeft(Keys.ArrowLeft);
            sprite.phisic.moveRight(Keys.ArrowRight);
            sprite.shoot(Keys.X);

            //const weapon = this.spriteFactory.createMissile();

            //if (input.isKeyPressed(Keys.X)) sprite.loadWeapon(weapon, this.enemy);

            sprite.phisic.applyFriction();
            sprite.phisic.setMaxSpeedLimit(30);

            sprite.phisic.setPosition({ posX: sprite.posX + sprite.velocityX, posY: sprite.posY + sprite.velocityY });

        };



        this.enemy.onUpdate = (sprite: ISprite) => {
            sprite.phisic.moveLeft(Keys.A);
            sprite.phisic.moveRight(Keys.D);
            sprite.phisic.moveUp(Keys.W);
            sprite.phisic.moveDown(Keys.S);
            sprite.phisic.applyFriction();
            sprite.phisic.setMaxSpeedLimit(50);
        };

        this.legend = new Legend(this.enemy);
        this.spriteFactory.spritesToDraw.push(this.legend);

    }

    update() {
        this.spaceship.updateSprite();
        this.enemy.updateSprite();
    }

}


SPG.Game(MyGame);

