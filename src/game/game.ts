import { Render } from './render';

const acceleration = 0.2;
const friction = 0.98;
const maxSpeed = 8;

const renderer = new Render(acceleration, friction, maxSpeed);

export function gameLoop() {
    renderer.gameLoop();
}
