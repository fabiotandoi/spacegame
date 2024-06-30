import { SpriteAnimation } from "../models/classes/animation.element";
import { Sprite } from "../models/classes/sprite.base.element";
import { IRender } from "../models/interface/render.interface";

export interface AbstractSpriteFactory {
    createSpaceShip(render: IRender): Sprite;
    createMissile(render: IRender): Sprite;
    createAnimation(loop: boolean): SpriteAnimation;
}