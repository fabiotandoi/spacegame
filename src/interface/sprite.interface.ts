import { InputHandler } from "../utils/input";
import { Render } from "../utils/render";
import { Drawable } from "./drawable.interface";
import { Position } from "./position.interface";
import { Size } from "./size.interface";

export class Sprite implements Drawable {
    inputHandler: InputHandler = new InputHandler();
    protected posX: number = 0;
    protected posY: number = 0;
    protected width: number = 0;
    protected height: number = 0;
    protected image: HTMLImageElement;
    protected render: Render;

    constructor(image: HTMLImageElement, render:Render) {
        this.render = render;
        this.image = image;
    }

    updatePosition(...args: any[]): void {
        // Implement the logic to update the position based on the provided arguments
        throw new Error('Method not implemented.');
    }

    setInitialPosition(x: number, y: number): void {
        this.posX = x;
        this.posY = y;
    }

    setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
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
