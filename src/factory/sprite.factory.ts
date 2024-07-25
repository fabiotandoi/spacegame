import { IRender } from "../models/interface/render.interface";
import { ISize } from "../models/interface/size.interface";
import { Missile } from "../logic/elements/missile.element";
import { Spaceship } from "../logic/elements/spaceship.element";
import { Sprite } from "../models/classes/sprite.base.element";
import { Render } from "../utils/render";
import { AbstractSpriteFactory } from "./sprite.abstract.factory";
import { SpriteAnimation } from "../models/classes/animation.controller";
import { IDrawable } from "../models/interface/drawable.interface";
import { AssetLoader } from "../utils/assetloader.utils";
import { ISprite } from "../models/interface/sprite.interface";
import { IInteractiveElement, InteractiveMissile } from "../logic/elements/refactor.temp.elements";

export class SpriteFactory implements AbstractSpriteFactory {

    private render: IRender;
    private static instance: SpriteFactory;
    animation: SpriteAnimation;
    spritesToDraw: IDrawable[] = [];
    assetLoader: AssetLoader = AssetLoader.getInstance();
    private  sprites: { [key: string]: ISprite } = {};


    private constructor() {
        this.render = Render.getInstance();
    }

    public createSprite(image: string): Sprite {
        const imageFromSrc = this.assetLoader.getImage(image);
        const sprite = new Sprite(imageFromSrc, this.render);
        const size: ISize = { width: imageFromSrc.naturalWidth, height: imageFromSrc.naturalHeight };
        const canvas = this.render.getCanvas();
        sprite.setSize(size);
        sprite.phisic.setPosition({ posX: canvas.width / 2 - size.width / 2, posY: canvas.height / 8 });
        this.spritesToDraw.push(sprite);
        return sprite;
    }

    public static getInstance(): SpriteFactory {
        if (!SpriteFactory.instance) {
            SpriteFactory.instance = new SpriteFactory();
        }
        return SpriteFactory.instance;
    }
    

    public createSpaceShip(): Spaceship {
        const imageFromSrc = this.assetLoader.getImage('sprites/spaceship.png');
        const canvas = this.render.getCanvas();
        const spaceship = new Spaceship(imageFromSrc, this.render);
        const size: ISize = { width: imageFromSrc.naturalWidth, height: imageFromSrc.naturalHeight }
        spaceship.phisic.setPosition({ posX: canvas.width / 2, posY: canvas.height / 1.2 });
        spaceship.setSize(size);
        this.spritesToDraw.push(spaceship);
        return spaceship;
    }

    public createMissile(): Sprite {
        const missileImage = this.assetLoader.getImage('sprites/missile.png');
        return new Missile(missileImage, this.render);
    }

    public createAnimation(loop = false): SpriteAnimation {
        const explosionImage = this.assetLoader.getImage('sprites/explosionblue.png');
        explosionImage.style.color = "green";
        this.animation = new SpriteAnimation(explosionImage, 80, 80, 5, 50, loop);
        return this.animation;
    }

    /**
     * @Pattern Factory and Flyweight
     * @description Create an interactive element
     * @returns IInteractiveElement
     */
    createInteractiveMissile():IInteractiveElement{

        const missileImage = this.assetLoader.getImage('sprites/missile.png');
        const key = 'missile';

        if(!(key in this.sprites)){
            this.sprites[key] = new Missile(missileImage, this.render);
        }

        return new InteractiveMissile(this.sprites[key]);
    }

    createInteractiveEnemy():IInteractiveElement{
        const enemyImage = this.assetLoader.getImage('sprites/enemy.png');
        const key = 'enemy';

        if(!(key in this.sprites)){
            this.sprites[key] = new Sprite(enemyImage, this.render);
        }

        return new InteractiveMissile(this.sprites[key]);
    }


}