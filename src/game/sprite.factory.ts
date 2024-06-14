export class SpriteFactory {
    private image: HTMLImageElement;

    constructor() {
        this.image = new Image();
    }

    setSource(src: string): SpriteFactory {
        this.image.src = src;
        return this;
    }

    build(): HTMLImageElement {
        return this.image;
    }

    public static createSpaceshipImage(): HTMLImageElement {
        return new SpriteFactory().setSource('static/sprites/spaceship.png').build();
    }

    public static createMissileImage(): HTMLImageElement {
        return new SpriteFactory().setSource('static/sprites/missile.png').build();
    }
}