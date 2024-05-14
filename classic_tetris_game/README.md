# Classic Tetris Game

This project is a web-based implementation of the classic Tetris game. Currently, the application is in development, and the gameplay features a single, interactive mode where users can control Tetris pieces on a web interface. The application utilizes WebSocket for real-time communication and is built with Express.js on the server side, with a basic frontend using HTML, CSS, and JavaScript.

## Overview

The architecture of this application is designed to be simple yet functional. It consists of:
- A Node.js and Express.js backend that handles HTTP requests and WebSocket connections for real-time gameplay.
- A frontend developed with vanilla HTML, CSS, and JavaScript, providing a minimalistic user interface for game interaction.
- WebSocket for efficient communication between the client and server, enabling dynamic updates to the game state without the need for page reloads.

## Features

- A basic interactive black rectangle representing the game area, with planned features including real-time Tetris gameplay mechanics.
- Real-time communication between the client and server using WebSocket.

## Getting started

### Requirements

- Node.js
- npm (Node Package Manager)

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies with `npm install`.
4. Start the server using `npm start` or `node server.js`.
5. Open a web browser and navigate to `http://localhost:3001` to view the application.

### License

Copyright (c) 2024.