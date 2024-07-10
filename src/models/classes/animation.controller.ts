import { IDrawable } from "../interface/drawable.interface";

export class SpriteAnimation implements IDrawable {
    frameHeight: number;
    image: HTMLImageElement;
    frameWidth: number;
    numFrames: number;
    frameTime: number;
    loop: boolean;
    isPlaying: boolean = false;
    frameIndex: number;
    elapsedTime: number;
    posX: number;
    posY: number;


    constructor(image: HTMLImageElement, frameWidth: number, frameHeight: number, numFrames: number, frameTime: number, loop: boolean) {
        this.image = image;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.numFrames = numFrames;
        this.frameTime = frameTime;
        this.loop = loop;
    }
    spriteId: number;

    start(posX?: number, posY?: number) {
        this.posX = posX || 0;
        this.posY = posY || 0;
        this.isPlaying = true;
        this.frameIndex = 0;
        this.elapsedTime = 0;
    }

    stop() {

        this.isPlaying = false;

    }

    update(deltaTime: number) {

        if (!this.isPlaying) return;

        this.elapsedTime += deltaTime;

        if (this.elapsedTime > this.frameTime) {

            this.frameIndex++;
            this.elapsedTime = 0;

            if (this.frameIndex >= this.numFrames) {
                if (this.loop) {
                    this.frameIndex = 0;
                } else {
                    this.stop();
                }
            }
        }
    }


    draw(ctx: CanvasRenderingContext2D): void {
        if (!this.isPlaying) return;
        const sourceX = this.frameIndex * this.frameWidth;
        ctx.drawImage(this.image, sourceX, 0, this.frameWidth, this.frameHeight, this.posX, this.posY, this.frameWidth, this.frameHeight);
    }

    setSize(width: number, height: number): void {
        this.frameWidth = width;
        this.frameWidth = height;
    }

    setPositioon(x: number, y: number): void {
        this.posX = x;
        this.posY = y;
    }


} 