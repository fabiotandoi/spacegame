import { InputHandler } from "../utils/input";
import { Drawable } from "./drawable.interface";

export interface Sprite extends Drawable {
    inputHandler: InputHandler;
    updatePosition(...args: any[]): void;
    setInitialPosition(x: number, y: number): void;
    setSize(width: number, height: number): void;
    getImage(): HTMLImageElement;
    isOffScreen(): boolean;
}
