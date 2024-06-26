import { IInputHandler } from "../models/interface/inputHandler.interface";
import { Keys } from "./key.enum";


export class InputHandler implements IInputHandler {

  private static instance: InputHandler;
  keys: Set<Keys>;

  private constructor() {
    this.keys = new Set();
    window.addEventListener('keydown', this.keyDown.bind(this));
    window.addEventListener('keyup', this.keyUp.bind(this));
  }

  static getInstance(): InputHandler {
    if (!InputHandler.instance) {
      InputHandler.instance = new InputHandler();
    }
    return InputHandler.instance;
  }

  keyDown(event: KeyboardEvent) {
    const key = event.code as Keys;
    if (Object.values(Keys).includes(key)) {
      this.keys.add(key);
    }
    this.logKeys();
  }

  keyUp(event: KeyboardEvent) {
    const key = event.code as Keys;
    if (Object.values(Keys).includes(key)) {
      this.keys.delete(key);
    }
    this.logKeys();
  }

  logKeys() {
  }

  isKeyPressed(key: Keys): boolean {
    return this.keys.has(key);
  }
}

export default InputHandler;
