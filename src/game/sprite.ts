export interface Sprite {
    draw(ctx: CanvasRenderingContext2D): void;
    updatePosition(...args: any[]): void;
}
