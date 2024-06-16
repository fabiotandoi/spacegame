import { Render } from "../utils/render";
import { Sprite } from "../interface/sprite.base.element";

export interface AbstractSpriteFactory {
    createSpaceShip(render: Render): Sprite;
    createMissile(render: Render): Sprite;
}