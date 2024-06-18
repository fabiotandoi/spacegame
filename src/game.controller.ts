import { Spaceship } from './logic/elements/spaceship.element';
import { InputHandler } from './utils/input';
import { Legend } from './utils/legend';
import { SpriteFactory } from './factory/sprite.factory';
import { IDrawable } from './models/interface/drawable.interface';
import { Render } from './utils/render';
import { Keys } from './utils/key.enum';
import { IRender } from './models/interface/render.interface';

export class GameController {
    spaceship: Spaceship;
    legend: Legend;
    drawables: IDrawable[] = [];
    render: IRender = Render.getInstance();
    spriteFactory: SpriteFactory = SpriteFactory.getInstance();

    constructor() {
        this.createGame();
    }

    createGame() {

        this.spaceship = this.spriteFactory.createSpaceShip();

        this.spaceship.onUpdate = (sprite: Spaceship, input: InputHandler) => {

           /*  if (input.isKeyPressed(Keys.ArrowUp)) sprite.velocityY -= sprite.acceleration;
            if (input.isKeyPressed(Keys.ArrowDown)) sprite.velocityY += sprite.acceleration;
            if (input.isKeyPressed(Keys.ArrowLeft)) sprite.velocityX -= sprite.acceleration;
            if (input.isKeyPressed(Keys.ArrowRight)) sprite.velocityX += sprite.acceleration; */
            if (input.isKeyPressed(Keys.ArrowUp)) sprite.moveUp();
            if (input.isKeyPressed(Keys.ArrowDown)) sprite.moveDown();
            if (input.isKeyPressed(Keys.ArrowLeft)) sprite.moveLeft();
            if (input.isKeyPressed(Keys.ArrowRight)) sprite.moveRight();

            if (input.isKeyPressed(Keys.X)) sprite.loadWeapon('static/sprites/missile.png');

            sprite.velocityX *= sprite.friction;
            sprite.velocityY *= sprite.friction;

            const speed = Math.sqrt(sprite.velocityX ** 2 + sprite.velocityY ** 2);
            if (speed > sprite.maxSpeed) {
                const scale = sprite.maxSpeed / speed;
                sprite.velocityX *= scale;
                sprite.velocityY *= scale;
            }

            sprite.setPosition({ posX: sprite.posX + sprite.velocityX, posY: sprite.posY + sprite.velocityY });
           
        };
 
        
        const enemy = this.spriteFactory.createSprite('static/sprites/enemy.png');

        this.legend = new Legend(this.spaceship);

        this.drawables.push(this.spaceship, this.legend, enemy);

    }

    updateGame() {
        this.spaceship.updateSprite();
        //const missile = this.spriteFactory.createMissile();
        //this.spaceship.setWeapon(missile);
    }

    gameLoop() {
        this.updateGame();
        this.render.draw(this.drawables);
        requestAnimationFrame(() => this.gameLoop());
    }
}
