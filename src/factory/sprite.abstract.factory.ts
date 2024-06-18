import { Render } from "../utils/render";
import { SpriteBase } from "../models/sprite.base.element";

export interface AbstractSpriteFactory {
    createSpaceShip(render: Render): SpriteBase;
    createMissile(render: Render): SpriteBase;
}