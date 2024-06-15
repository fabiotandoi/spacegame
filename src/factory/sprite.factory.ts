import { Missile } from "../game/sprites/missile.sprite";
import { Spaceship } from "../game/sprites/spaceship.sprite";

export class SpriteFactory {
    private image: HTMLImageElement;


    private constructor() {
        this.image = new Image();
    }

    private static setImage(src:string): HTMLImageElement {
        const image = new Image();
        image.src = src;
        return image;
    }

    public static createSpaceShip(canvas: HTMLCanvasElement) {
        const spaceshipImage = SpriteFactory.setImage('static/sprites/spaceship.png');
        return new Spaceship(spaceshipImage, canvas);
    }

    public static createMissile(canvas: HTMLCanvasElement) {
        const missileImage = SpriteFactory.setImage('static/sprites/missile.png');
        return new Missile(missileImage, canvas);
    }
}