import { InputHandler } from "../utils/input";
import { Drawable } from "./drawable.interface";

/**
 * This interface represents a sprite, which is a drawable object that can be moved on the screen.
 * A sprite has an input handler, which allows it to react to user input.
 * It also has methods to set its initial position, size, and get its image.
 * Additionally, it provides methods to update its position and check if it is off screen.
 */
export interface Sprite extends Drawable {
    /**
     * The input handler associated with this sprite.
     */
    inputHandler: InputHandler;

    /**
     * Updates the position of the sprite based on the provided arguments.
     * @param args - The arguments to update the sprite's position.
     */
    updatePosition(...args: any[]): void;

    /**
     * Sets the initial position of the sprite.
     * @param x - The x-coordinate of the sprite's initial position.
     * @param y - The y-coordinate of the sprite's initial position.
     */
    setInitialPosition(x: number, y: number): void;

    /**
     * Sets the size of the sprite.
     * @param width - The width of the sprite.
     * @param height - The height of the sprite.
     */
    setSize(width: number, height: number): void;

    /**
     * Gets the image of the sprite.
     * @returns The HTMLImageElement representing the sprite's image.
     */
    getImage(): HTMLImageElement;

    /**
     * Checks if the sprite is off screen.
     * @returns True if the sprite is off screen, false otherwise.
     */
    isOffScreen(): boolean;
}
