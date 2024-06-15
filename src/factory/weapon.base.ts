import { InputHandler } from "../utils/input";
import { Sprite } from "./sprite.interface";

export class Weapon implements Sprite {
    inputHandler: InputHandler;

    private controlKeys: string[] = [];

    draw(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    updatePosition(...args: any[]): void {
        throw new Error("Method not implemented.");
    }
    setInitialPosition(x: number, y: number): void {
        throw new Error("Method not implemented.");
    }
    setSize(width: number, height: number): void {
        throw new Error("Method not implemented.");
    }
    getImage(): HTMLImageElement {
        throw new Error("Method not implemented.");
    }

    protected setControls(...controelKeys: string[]) {
        this.controlKeys = controelKeys;
    }


    protected shoot() {
        
    }

}