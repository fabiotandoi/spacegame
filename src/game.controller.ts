import { Spaceship } from './logic/elements/spaceship.element';
import { InputHandler } from './utils/input';
import { Legend } from './utils/legend';
import { SpriteFactory } from './factory/sprite.factory';
import { Drawable } from './interface/drawable.interface';
import { Render } from './utils/render';
import { Keys } from './utils/key.enum';

export class GameController {
    spaceship: Spaceship;
    legend: Legend;
    drawables: Drawable[] = [];
    render: Render = Render.getInstance();
    spriteFactory: SpriteFactory = SpriteFactory.getInstance();

    constructor() {
        this.createGame();
    }

    createGame() {

        this.spaceship = this.spriteFactory.createSpaceShip();

        this.spaceship.onUpdate = (sprite: Spaceship, input: InputHandler) => {

            if (input.isKeyPressed(Keys.ArrowUp)) sprite.speedY -= sprite.acceleration;
            if (input.isKeyPressed(Keys.ArrowDown)) sprite.speedY += sprite.acceleration;
            if (input.isKeyPressed(Keys.ArrowLeft)) sprite.speedX -= sprite.acceleration;
            if (input.isKeyPressed(Keys.ArrowRight)) sprite.speedX += sprite.acceleration;

            if (input.isKeyPressed(Keys.X)) sprite.loadWeapon('static/sprites/missile.png');

            sprite.speedX *= sprite.friction;
            sprite.speedY *= sprite.friction;

            const speed = Math.sqrt(sprite.speedX ** 2 + sprite.speedY ** 2);
            if (speed > sprite.maxSpeed) {
                const scale = sprite.maxSpeed / speed;
                sprite.speedX *= scale;
                sprite.speedY *= scale;
            }

            sprite.setPosition({ posX: sprite.posX + sprite.speedX, posY: sprite.posY + sprite.speedY });
           
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
