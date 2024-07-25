import { Spaceship } from './logic/elements/spaceship.element';
import { Legend } from './utils/legend';
import { SpriteFactory } from './factory/sprite.factory';
import { Keys } from './utils/key.enum';
import { ISprite } from './models/interface/sprite.interface';
import { SpriteAnimation } from './models/classes/animation.controller';
import { SPG } from './core/spacegame';
import { IWeapon } from './models/interface/weapon.interface';

export class MyGame extends SPG.GameController {
    spaceship: Spaceship;
    enemy: ISprite;
    legend: Legend;
    spriteFactory: SpriteFactory = SpriteFactory.getInstance();
    explosionAnimation: SpriteAnimation;
    weapon: IWeapon;

    constructor() {
        super();
    }
    /**
     * Preloads the necessary assets for the game.
     *
     * This method loads the following assets:
     * - Missile image
     * - Enemy image
     * - Explosion image
     * - Spaceship image
     *
     * The assets are loaded using the {@link AssetLoader} provided by the {@link SPG}
     * module.
     */
    preload(): void {
        // Load missile image
        this.assetLoader.loadAsset(`${SPG.spriteRoot}/missile.png`);

        // Load enemy image
        this.assetLoader.loadAsset(`${SPG.spriteRoot}/enemy.png`);

        // Load explosion image
        this.assetLoader.loadAsset(`${SPG.spriteRoot}/explosionblue.png`);

        // Load spaceship image
        this.assetLoader.loadAsset(`${SPG.spriteRoot}/spaceship.png`);
    }

    /**
     * Loads the necessary assets and initializes the game objects.
     *
     * This method is called automatically by the {@link SPG} module.
     */
    load() {
        // Create the spaceship
        this.spaceship = this.spriteFactory.createSpaceShip();
        // Create the enemy
        this.enemy = this.spriteFactory.createSprite('sprites/enemy.png');
        // Create the weapon (missile)
        this.weapon = this.spriteFactory.createMissile();

        // Load the weapon on the spaceship
        this.spaceship.loadWeapon(this.weapon, this.enemy);

        // Define the update function for the spaceship
        this.spaceship.onUpdate = (sprite: Spaceship) => {
            // Move the spaceship
            sprite.phisic.moveUp(Keys.ArrowUp);
            sprite.phisic.moveDown(Keys.ArrowDown);
            sprite.phisic.moveLeft(Keys.ArrowLeft);
            sprite.phisic.moveRight(Keys.ArrowRight);

            // Shoot the weapon
            sprite.shoot(Keys.X);
            sprite.newShoot(Keys.Z);

            // Apply friction to the spaceship
            sprite.phisic.applyFriction();

            // Set the maximum speed limit for the spaceship
            sprite.phisic.setMaxSpeedLimit(30);

            // Update the position of the spaceship
            sprite.phisic.setPosition({
                posX: sprite.posX + sprite.velocityX,
                posY: sprite.posY + sprite.velocityY,
            });
        };

        // Define the update function for the enemy
        this.enemy.onUpdate = (sprite: ISprite) => {
            // Move the enemy
            sprite.phisic.moveLeft(Keys.A);
            sprite.phisic.moveRight(Keys.D);
            sprite.phisic.moveUp(Keys.W);
            sprite.phisic.moveDown(Keys.S);

            // Apply friction to the enemy
            sprite.phisic.applyFriction();

            // Set the maximum speed limit for the enemy
            sprite.phisic.setMaxSpeedLimit(50);
        };

        /*  // Create the legend
         this.legend = new Legend(this.enemy);
 
         // Add the legend to the list of sprites to draw
         this.spriteFactory.spritesToDraw.push(this.legend); */
    }

    /**
     * Update the game state by calling the update methods of the spaceship and the enemy.
     */
    /* update() {
        // Update the spaceship
        //this.spaceship.updateSprite();

        // Update the enemy
        //this.enemy.updateSprite();
    } */

}


SPG.Game(MyGame);

