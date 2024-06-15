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

    public static createMissile() {
        /* const factory = new SpriteFactory();
        const missileImage = SpriteFactory.createMissileImage();
        const spaceshipImage = new Image().src = 'static/sprites/spaceship.png';
        //new Spaceship(factory.x, factory.y, spaceshipImage, missileImage, factory.canvas.width, factory.canvas.height); */
    }
}