import { Render } from "../utils/render";
import { Sprite } from "../interface/sprite.interface";

export interface AbstractSpriteFactory {
    createSpaceShip(render: Render): Sprite;
    createMissile(render: Render): Sprite;
}