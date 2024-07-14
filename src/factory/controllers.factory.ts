import { IPhisicController, PhisicController } from "../models/classes/phisic.controller";
import { ISprite } from "../models/interface/sprite.interface";

export class ControllersFactory {

    static createPhisicController(sprite: ISprite): IPhisicController {
        return new PhisicController(sprite);
    }
}