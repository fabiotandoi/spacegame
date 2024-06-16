/**
 * This interface represents a drawable object, which can be drawn on the screen.
 *
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @return {void}
 *
 */
export interface Drawable {
    draw(ctx: CanvasRenderingContext2D): void
}
