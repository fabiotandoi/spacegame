export interface Sprite {
    draw(ctx: CanvasRenderingContext2D): void;
    updatePosition(...args: any[]): void;
    setInitialPosition(x: number, y: number): void;
    setSize(width: number, height: number): void;
}
