import { GameControllerBase } from '../models/classes/gamecontroller.base.element';
import { AssetLoader } from '../utils/assetloader.utils';

type GameControllerConstructor = new () => GameControllerBase;

export const SPG = {
    GameController: GameControllerBase,
    Game: (gameController: GameControllerConstructor) => {
        return new gameController();
    },
    AssetLoader: AssetLoader.getInstance()
};