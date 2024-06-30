import { IGameController } from './models/interface/gamecontroller.interface';
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
import { GameControllerBase } from './models/classes/gamecontroller.base.element';

export class GameController extends GameControllerBase {
    spaceship: Spaceship;
    enemy: ISprite;
    legend: Legend;
    drawables: IDrawable[] = [];
    render: IRender = Render.getInstance();
    spriteFactory: SpriteFactory = SpriteFactory.getInstance();
    explosionAnimation: SpriteAnimation;

    constructor() {
        super();
    }
    async preload(): Promise<void> {
        await this.assetLoader.loadImage('assets/sprites/missile.png');
        await this.assetLoader.loadImage('assets/sprites/enemy.png');
        await this.assetLoader.loadImage('assets/sprites/spaceship.png');
        await this.assetLoader.loadImage('assets/sprites/explosionblue.png');
    }

    load() {

          this.spaceship = this.spriteFactory.createSpaceShip();
   
           this.spaceship.onUpdate = (sprite: Spaceship, input: InputHandler) => {
   
               if (input.isKeyPressed(Keys.ArrowUp)) sprite.moveUp();
               if (input.isKeyPressed(Keys.ArrowDown)) sprite.moveDown();
               if (input.isKeyPressed(Keys.ArrowLeft)) sprite.moveLeft();
               if (input.isKeyPressed(Keys.ArrowRight)) sprite.moveRight();
   
               if (input.isKeyPressed(Keys.X)) sprite.loadWeapon('assets/sprites/missile.png', this.enemy);
   
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
   
          /*  this.explosionAnimation = this.spriteFactory.createAnimation();;
           this.explosionAnimation.setPositioon(100, 100);
           this.explosionAnimation.start(); */
   
           this.drawables.push(this.spaceship, this.legend, this.enemy);
           const newEnemy = Object.assign({}, this.enemy);
           this.spriteFactory.spritesToDraw.push(this.spaceship, this.legend, this.enemy);

    }

    public static async createGameController(): Promise<GameController> {
        let gameController = new GameController();
        await gameController.preload();
        gameController.load();
        return gameController;
    }

    update() {
        this.spaceship.updateSprite();
        this.enemy.updateSprite();
       //this.explosionAnimation.update(4);
    }

}
