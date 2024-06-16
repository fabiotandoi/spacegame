import { Drawable } from "./drawable.interface";
import { Sprite } from "./sprite.base.element";
import { Weapon } from "./weapon.interface";

/**
 * This interface represents a shooter, which is a sprite that can fire weapons.
 * It extends the Sprite interface, which means it can be drawn on the screen and moved.
 * A shooter has methods to shoot a weapon and update its weapons.
 *
 */
export interface Shooter extends Drawable {
    /**
     * Shoots a weapon.
     * @param weapon - The weapon to be fired.
     */
    shoot(weapon: Weapon): void;

    /**
     * Updates the weapons of the shooter.
     */
    updateWeapons(): void;
}
