import { Keys } from "../utils/key.enum";
import { Drawable } from "./drawable.interface";
import { Weapon } from "./weapon.interface";

/**
 * This interface represents a shooter, which is a sprite that can fire weapons.
 * It extends the Sprite interface, which means it can be drawn on the screen and moved.
 * A shooter has methods to shoot a weapon and update its weapons.
 *
 */
export interface Shooter extends Drawable {

    /**
     * The weapons of the shooter.
     */
    weapons: Weapon[];
    /**
     * Shoots a weapon.
     * @param weapon - The weapon to be fired.
     * @param key - The key that was pressed.
     */
    shoot(weapon: Weapon, key: Keys): void;

    /**
     * Updates the weapons of the shooter.
     */
    updateWeapons(): void;
}
