import { Drawable } from "../interface/drawable.interface";

export class Render {
    private canvas: HTMLCanvasElement = document.getElementById('gameCanvas') as HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private constructor() {
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    public static createRender() {
        return new Render();
    }

    getCanvas() {
        return this.canvas;
    }

    draw(drawables: Drawable[]) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        drawables.forEach(drawable => drawable.draw(this.ctx));
    }
}