import { InputHandler } from "../utils/input";
import { Drawable } from "./drawable";

export interface Sprite extends Drawable {
    inputHandler: InputHandler;
    updatePosition(...args: any[]): void;
    setInitialPosition(x: number, y: number): void;
    setSize(width: number, height: number): void;
    getImage(): HTMLImageElement;
}
