import { SpriteAnimation } from "../models/classes/animation.element";
import { Sprite } from "../models/classes/sprite.base.element";
import { IRender } from "../models/interface/render.interface";

export interface AbstractSpriteFactory {
    createSpaceShip(render: IRender): Promise<Sprite>;
    createMissile(render: IRender): Promise<Sprite>;
    createAnimation(loop: boolean): Promise<SpriteAnimation>;
}