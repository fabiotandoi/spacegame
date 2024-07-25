import { ControllersFactory } from "../../factory/controllers.factory";
import { IPhisicController, PhisicController } from "../../models/classes/phisic.controller";
import { IDrawable } from "../../models/interface/drawable.interface";
import { IPosition } from "../../models/interface/position.interface";
import { IRender } from "../../models/interface/render.interface";
import { ISize } from "../../models/interface/size.interface";
import { ISprite } from "../../models/interface/sprite.interface";




export interface IInteractiveElement {

    gameElement: ISprite;
    posX: number;
    posY: number;
    phisic: IPhisicController;

    updatePosition(x: number, y: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    onUpdate(...args: any[]): void;
    setSize(size: ISize): void;
    updateSprite(...args: any[]): void;
    isOffScreen(): boolean;
    destroy(): void;
    setPosition(position: IPosition): void;


}

export class InteractiveMissile implements IInteractiveElement,IDrawable {
    gameElement: ISprite;
    posX: number;
    posY: number;
    phisic: IPhisicController;


    constructor(gameElement: ISprite) {
        this.gameElement = gameElement;
        this.gameElement.width = 16;
        this.gameElement.height = 32;
        this.phisic = ControllersFactory.createPhisicController(this.gameElement);
    }

    setSize(size: ISize): void {
        this.gameElement.width = size.width;
        this.gameElement.height = size.height;
    }


    updatePosition(): void {
        this.posY += this.gameElement.velocityY;
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.gameElement.image, this.posX - this.gameElement.width / 2, this.posY - this.gameElement.height / 2, this.gameElement.width, this.gameElement.height);
    }

    updateSprite(...args: any[]): void {
        if (typeof (this.onUpdate) === 'function') {
            this.onUpdate(this);
            this.updatePosition();
        };
    }

    onUpdate(...args: any[]): void {
       
    }

    setPosition(position: IPosition) {
        this.posX = position.posX;
        this.posY = position.posY;
    }

    isOffScreen(): boolean {
        return this.posY + this.gameElement.height < 0;
    }
    
    destroy(): void {

    }

       

}

export class IInteractiveEnemy implements IInteractiveElement,IDrawable {
    gameElement: ISprite;
    posX: number;
    posY: number;
    phisic: IPhisicController;
    onCollision: (element: IInteractiveElement) => void;
    constructor(gameElement: ISprite) {
        this.gameElement = gameElement;
        this.gameElement.width = 16;
        this.gameElement.height = 32;
        this.phisic = ControllersFactory.createPhisicController(this.gameElement);
    }
    isOffScreen(): boolean {
        throw new Error("Method not implemented.");
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }
    setPosition(position: IPosition): void {
        throw new Error("Method not implemented.");
    }
    

    setSize(size: ISize): void {
        this.gameElement.width = size.width;
        this.gameElement.height = size.height;
    }

    updatePosition(): void {
        this.posY += this.gameElement.velocityY;
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.gameElement.image, this.posX - this.gameElement.width / 2, this.posY - this.gameElement.height / 2, this.gameElement.width, this.gameElement.height);
    }

    updateSprite(...args: any[]): void {
        if (typeof (this.onUpdate) === 'function') {
            this.onUpdate(this);
            this.updatePosition();
        };
    }

    onUpdate(...args: any[]): void {
       
    }
}