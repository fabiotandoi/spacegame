import { Missile } from "../logic/sprites/missile.sprite";
import { Spaceship } from "../logic/sprites/spaceship.sprite";
import { Render } from "../utils/render";
import { AbstractSpriteFactory } from "./sprite.abstract.factory";
import { Sprite } from "./sprite.interface";

export class SpriteFactory implements AbstractSpriteFactory {

    private render: Render;

    private constructor(render: Render) {
        this.render = render;
    }

    public static createSpriteFactory(render: Render): SpriteFactory {
        return new SpriteFactory(render);
    }

    private static setImage(src: string): HTMLImageElement {
        const image = new Image();
        image.src = src;
        return image;
    }

    public createSpaceShip() {
        const spaceshipImage = SpriteFactory.setImage('static/sprites/spaceship.png');
        return new Spaceship(spaceshipImage, this.render);
    }

    public createMissile() {
        const missileImage = SpriteFactory.setImage('static/sprites/missile.png');
        return new Missile(missileImage, this.render);
    }
}