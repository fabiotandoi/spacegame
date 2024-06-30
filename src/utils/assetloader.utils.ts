export interface IAssetLoader {
    loadImage(path: string): Promise<HTMLImageElement>;
    getImage(path: string): HTMLImageElement;
}



export class AssetLoader implements IAssetLoader {
    private static instance: AssetLoader;
    private images: Map<string, HTMLImageElement> = new Map(); // <key, value>
    private constructor() {}    // private constructor

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

    public getImage(path: string): HTMLImageElement {
        return this.images.get(path);
    }
    
}    // AssetLoader     
