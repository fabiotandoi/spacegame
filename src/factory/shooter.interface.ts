import { Sprite } from "./sprite.interface";
import { Weapon } from "./weapon.base";

export interface Shooter extends Sprite {
    shoot(weapon: Weapon): void;
    updateWeapons(): void;
}