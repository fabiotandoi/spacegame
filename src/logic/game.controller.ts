import { Spaceship } from '../game/sprites/spaceship.sprite';
import { InputHandler } from '../utils/input';
import { Legend } from '../utils/legend';
import { SpriteFactory } from '../factory/sprite.factory';
import { Sprite } from '../factory/sprite.interface';
import { Drawable } from '../factory/drawable';
import { Render } from '../utils/render';

export class GameController {
    spaceship: Spaceship;
    inputHandler: InputHandler;
    legend: Legend;
    drawables: Drawable[] = [];
    render: Render = Render.createRender();

    constructor() {
        this.inputHandler = new InputHandler();
        this.createGame();
    }

    createGame() {

        const canvas = this.render.getCanvas();

        this.spaceship = SpriteFactory.createSpaceShip(canvas);

        this.legend = new Legend(this.spaceship);

        this.spaceship.setInitialPosition(canvas.width / 2, canvas.height / 2);

        this.spaceship.setSize(112, 112);

        this.drawables.push(this.spaceship, this.legend);
    }

    updateGame() {

        this.spaceship.updatePosition();

        if (this.inputHandler.keys['x']) {
            const missile = SpriteFactory.createMissile(this.render.getCanvas());
            this.spaceship.shoot(missile);
            this.inputHandler.keys['x'] = false; // Prevenire il continuo sparo
        }
    }

    gameLoop() {
        this.updateGame();
        this.render.draw(this.drawables);
        requestAnimationFrame(() => this.gameLoop());
    }
}
