import { IRender } from "../models/interface/render.interface";
import { ISize } from "../models/interface/size.interface";
import { Missile } from "../logic/elements/missile.element";
import { Spaceship } from "../logic/elements/spaceship.element";
import { Sprite } from "../models/classes/sprite.base.element";
import { Render } from "../utils/render";
import { AbstractSpriteFactory } from "./sprite.abstract.factory";
import { SpriteAnimation } from "../models/classes/animation.element";
import { IDrawable } from "../models/interface/drawable.interface";

export class SpriteFactory implements AbstractSpriteFactory {

    private render: IRender;
    private static instance: SpriteFactory;
    animation: SpriteAnimation;
    spritesToDraw: IDrawable[] = [];


    private constructor() {
        this.render = Render.getInstance();
    }


    public async createSprite(image: string): Promise<Sprite> {
        const imageFromSrc = await this.setImage(image);
        const sprite = new Sprite(imageFromSrc, this.render);
        const size: ISize = { width: imageFromSrc.naturalWidth, height: imageFromSrc.naturalHeight };
        const canvas = this.render.getCanvas();
        sprite.setSize(size);
        sprite.setPosition({ posX: canvas.width / 2 - size.width / 2, posY: canvas.height / 8 });
        return sprite;
    }

    public static getInstance(): SpriteFactory {
        if (!SpriteFactory.instance) {
            SpriteFactory.instance = new SpriteFactory();
        }
        return SpriteFactory.instance;
    }

    private setImage(src: string): Promise<HTMLImageElement> {
        const image = new Image();
        image.src = src;

        return new Promise((resolve, reject) => {
            image.onload = () => {
                resolve(image);
            }
        })

    }

    public async createSpaceShip(): Promise<Spaceship> {
        const imageFromSrc = await this.setImage('assets/sprites/spaceship.png');
        const canvas = this.render.getCanvas();
        const spaceship = new Spaceship(imageFromSrc, this.render);
        const size: ISize = { width: imageFromSrc.naturalWidth, height: imageFromSrc.naturalHeight }
        spaceship.setPosition({ posX: canvas.width / 2, posY: canvas.height / 1.2 });
        spaceship.setSize(size);
        return spaceship;
    }

    public async createMissile(): Promise<Sprite> {
        const missileImage = await this.setImage('assets/sprites/missile.png');
        return new Missile(missileImage, this.render);
    }

    public async createAnimation(loop = false): Promise<SpriteAnimation> {
        const explosionImage = await this.setImage('assets/sprites/explosionblue.png');
        explosionImage.style.color = "green";
        this.animation = new SpriteAnimation(explosionImage, 80, 80, 5, 50, loop);
        return this.animation;
    }
}