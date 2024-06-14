import { Sprite } from './sprite';
import { Spaceship } from './spaceship';

export class Legend implements Sprite {
    spaceship: Spaceship;

    constructor(spaceship: Spaceship) {
        this.spaceship = spaceship;
    }
    updatePosition(...args: any[]): void {
        throw new Error('Method not implemented.');
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`Posizione X: ${this.spaceship.x.toFixed(2)}`, 10, 20);
        ctx.fillText(`Posizione Y: ${this.spaceship.y.toFixed(2)}`, 10, 40);
        ctx.fillText(`Velocità X: ${this.spaceship.velocityX.toFixed(2)}`, 10, 60);
        ctx.fillText(`Velocità Y: ${this.spaceship.velocityY.toFixed(2)}`, 10, 80);
    }
}
