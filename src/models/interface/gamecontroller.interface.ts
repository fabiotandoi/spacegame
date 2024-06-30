export interface IGameController {
    preload(): Promise<void>;
    load(delta: number): void;
    update(): void;
    gameLoop(): void;
}