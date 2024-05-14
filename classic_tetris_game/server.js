const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const TetrisGameLogic = require('./gameLogic.js'); // Require the Tetris game logic

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
  console.log('Client connected');
  const game = new TetrisGameLogic(); // Initialize game logic for each connection
  let gameUpdateInterval;

  // Start the game update loop
  gameUpdateInterval = setInterval(() => {
    game.update(); // Update the game state periodically
    const state = {
      grid: game.grid,
      currentPiece: game.currentPiece,
      nextPiece: game.nextPiece
    };
    ws.send(JSON.stringify({ state }));
    console.log('Periodic game state update sent to client');
  }, 1000); // Update the game state every second

  ws.on('message', (message) => {
    console.log('Received:', message);
    try {
      const data = JSON.parse(message);
      if (data.action) {
        switch (data.action) {
          case 'moveLeft':
            game.movePiece('left');
            break;
          case 'moveRight':
            game.movePiece('right');
            break;
          case 'rotate':
            game.rotatePiece();
            break;
          case 'drop':
            game.movePiece('down');
            break;
          default:
            throw new Error('Invalid action');
        }

        // No need to call game.update() here as it's called periodically

        // Serialize the updated game state and send it back to the client
        const state = {
          grid: game.grid,
          currentPiece: game.currentPiece,
          nextPiece: game.nextPiece
        };
        ws.send(JSON.stringify({ state }));
        console.log('Game state updated and sent to client after action');
      } else {
        throw new Error('No action specified');
      }
    } catch (error) {
      console.error('Error processing message:', error.stack);
      ws.send(JSON.stringify({ error: 'Error processing your message' }));
    }
  });

  ws.on('close', () => {
    clearInterval(gameUpdateInterval); // Stop the game update loop when client disconnects
    console.log('Game update interval cleared for this connection');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));