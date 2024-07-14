export interface IAssetLoader {
    loadImage(path: string): Promise<HTMLImageElement>;
    getImage(path: string): HTMLImageElement;
    loadPromisesAssets(): Promise<HTMLImageElement[]>;
    loadAsset(path: string): void;
}
