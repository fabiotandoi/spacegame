export interface IAssetLoader {
    loadImage(path: string): Promise<HTMLImageElement>;
    getImage(path: string): HTMLImageElement;
    loadPromisesAssets(): Promise<HTMLImageElement[]>;
    loadAsset(path: string): void;
}



export class AssetLoader implements IAssetLoader {
    private static instance: AssetLoader;
    private images: Map<string, HTMLImageElement> = new Map(); // <key, value>
    private assets: string[] = [];

    private constructor() { }    // private constructor

    public static getInstance(): AssetLoader {
        if (!AssetLoader.instance) {
            AssetLoader.instance = new AssetLoader();
        }
        return AssetLoader.instance;
    }    // public static getInstance

    public loadImage(path: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();    // create new image
            image.src = path;    // set image src
            image.onload = () => {
                this.images.set(path, image);    // save image  
                resolve(image);
            };
        });
    }    // public loadImage    

    public async loadPromisesAssets() {
        const promises: Promise<HTMLImageElement>[] = [];
        this.assets.forEach((path) => {
            const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                const image = new Image();    // create new image
                image.src = path;    // set image src
                image.onload = () => {
                    this.images.set(path, image);    // save image  
                    resolve(image);
                };
            });
            promises.push(promise);
        });

        return Promise.all(promises);
    }

    public loadAsset(path: string): void {
        this.assets.push(path);
    }

    public getImage(path: string): HTMLImageElement {
        return this.images.get(path);
    }

}    // AssetLoader     
