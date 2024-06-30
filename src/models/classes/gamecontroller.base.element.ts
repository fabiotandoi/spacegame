import { SpriteFactory } from '../../factory/sprite.factory';
import { AssetLoader, IAssetLoader } from '../../utils/assetloader.utils';
import { Render } from '../../utils/render';
import { IRender } from '../interface/render.interface';
export class GameControllerBase {

    render: IRender = Render.getInstance();
    spriteFactory: SpriteFactory = SpriteFactory.getInstance();
    assetLoader: IAssetLoader = AssetLoader.getInstance();

    constructor() {

    }

    protected async preload(): Promise<void> {
    }

    protected load(delta: number): void {
    }


    public update(): void {
    }

    public gameLoop(): void {
        this.update();
        this.render.draw(this.spriteFactory.spritesToDraw);
        requestAnimationFrame(() => this.gameLoop());
    }

  
}