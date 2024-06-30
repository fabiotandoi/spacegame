import { GameController } from "./game.controller";

GameController.createGameController().then((gameController) => {
    gameController.gameLoop();
});

