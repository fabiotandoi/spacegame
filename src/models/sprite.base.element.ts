import { InputHandler } from "../utils/input";
import { Positions, Render } from "../utils/render";
import { Drawable } from "../interface/drawable.interface";
import { Position } from "../interface/position.interface";
import { Size } from "../interface/size.interface";

export class SpriteBase implements Drawable {
    public inputHandler: InputHandler = InputHandler.getInstance();
    public posX: number = 0;
    public posY: number = 0;
    protected width: number = 0;
    protected height: number = 0;
    protected image: HTMLImageElement;
    protected render: Render;
    onUpdate: (sprite: SpriteBase, input: InputHandler) => void;

    constructor(image: HTMLImageElement, render: Render) {
        this.render = render;
        this.image = image;
    }

    updatePosition(...args: any[]): void {
        // Implement the logic to update the position based on the provided arguments
        if (typeof (this.onUpdate) === 'function') {
            this.onUpdate(this, this.inputHandler);
        }
        throw new Error('Method not implemented.');
    }

    setPosition(position: Position): void {
        this.posX = position.posX;
        this.posY = position.posY;
    }

    setSize(size: Size): void {
        this.width = size.width;
        this.height = size.height;
    }

    getPosition(): Position {
        return <Position>{ posX: this.posX, posY: this.posY };
    }

    getSize(): Size {
        return <Size>{ width: this.width, height: this.height };
    }

    getImage(): HTMLImageElement {
        return this.image;
    }

    isOffScreen(): boolean {
        // Implement the logic to check if the sprite is off screen
        throw new Error('Method not implemented.');
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}
