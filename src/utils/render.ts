import { IDrawable } from "../models/interface/drawable.interface";
import { IRender } from "../models/interface/render.interface";

export enum Positions {
    TOP_LEFT = 'left',
    TOP_RIGHT = 'right',
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom'
}

export class Render implements IRender {

    private static instance: IRender;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private constructor() {
        this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    public static createRender() {
        return new Render();
    }

    public static getInstance(): IRender {
        if (!Render.instance) {
            Render.instance = new Render();
        }
        return Render.instance;
    }

    getCanvas() {
        return this.canvas;
    }

    draw(drawables: IDrawable[]) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        drawables.forEach(drawable => drawable.draw(this.ctx));
    }
}