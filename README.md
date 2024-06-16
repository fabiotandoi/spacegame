# spacegame: a TypeScript Game Framework


## Overview

This project aims to create a mini framework for educational purposes to understand the best practices of object-oriented programming in TypeScript. The framework applies well-known design patterns and the SOLID principles, demonstrating their use in building a simple game. Additionally, this project highlights the capabilities of Node.js and the fundamentals of game physics.

## Goals

1. **Educational Purpose**: The primary goal of this project is to serve as an educational tool for learning and applying object-oriented programming principles and design patterns in TypeScript.
2. **SOLID Principles**: Demonstrate the application of SOLID principles in a real-world project.
3. **Design Patterns**: Implement various design patterns to showcase their practical use in game development.
4. **Node.js Capabilities**: Highlight the use of Node.js in building and running a game.
5. **Game Physics**: Emphasize the implementation of basic game physics, such as motion and collision detection.

## Features

- **Object-Oriented Design**: The project uses classes and interfaces to encapsulate game logic and promote code reusability and maintainability.
- **Design Patterns**: The framework implements several design patterns, including Abstract Factory, Command, and more.
- **SOLID Principles**: Each component of the game is designed to adhere to the SOLID principles, ensuring a clean and scalable codebase.
- **Node.js Integration**: The game leverages Node.js for building and running the project, demonstrating its potential in game development.
- **Game Physics**: Basic physics such as velocity, acceleration, and collision detection are implemented to simulate realistic movement.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/typescript-game-framework.git
    cd typescript-game-framework
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Build the project:**

    ```bash
    npm run build
    ```

4. **Run the server:**

    ```bash
    npm run start
    ```

5. **Open your browser and navigate to:**

    ```plaintext
    http://localhost:3000
    ```

### Usage

The project can be downloaded and used freely for educational purposes. Note that the sprite images included (`spaceship.png` and `missile.png`) are for educational use only and should not be used in other projects without permission.

## Project Structure

- `src/`
  - `drawable.ts`: Defines the `Drawable` interface.
  - `factories.ts`: Contains abstract and concrete factories for creating sprites.
  - `game.ts`: Entry point of the application, starts the game loop.
  - `input.ts`: Manages keyboard input.
  - `legend.ts`: Displays game state information on the canvas.
  - `missile.ts`: Represents a missile in the game.
  - `render.ts`: Manages the rendering of the game.
  - `spaceship.ts`: Represents the spaceship.

- `www/`
  - `index.html`: The main HTML file.
  - `index.js`: The compiled JavaScript file.
  - `static/`
    - `spaceship.png`: Sprite image for the spaceship.
    - `missile.png`: Sprite image for the missile.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

The sprite images (`spaceship.png` and `missile.png`) are included for educational purposes only and should not be used in other projects without permission.
