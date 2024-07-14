import { SpriteFactory } from '../../factory/sprite.factory';
import { AssetLoader } from '../../utils/assetloader.utils';
import { Render } from '../../utils/render';
import { IAssetLoader } from '../interface/assetLoader.interface';
import { IRender } from '../interface/render.interface';
import { ISprite } from '../interface/sprite.interface';
export class GameControllerBase {

    private render: IRender = Render.getInstance();
    spriteFactory: SpriteFactory = SpriteFactory.getInstance();
    assetLoader: IAssetLoader = AssetLoader.getInstance();

    constructor() {
        this.run();
    }

    protected preload(): any {
    }

    private async run() {
        this.preload();
        await this.assetLoader.loadPromisesAssets();
        this.load();
        this.gameLoop();
    }

    protected load(): void {
    }

    public update(): void {
        this.spriteFactory.spritesToDraw.forEach((sprite:ISprite) => sprite.updateSprite());
    }

    public gameLoop(): void {
        this.update();
        this.render.draw(this.spriteFactory.spritesToDraw);
        requestAnimationFrame(() => this.gameLoop());
    }


}