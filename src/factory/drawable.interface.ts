import { Render } from "../utils/render"

export interface Drawable {
    draw(ctx: CanvasRenderingContext2D): void
}