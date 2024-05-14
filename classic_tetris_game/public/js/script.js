// Establish a WebSocket connection with the server
const ws = new WebSocket('ws://localhost:3001');

ws.onopen = () => {
    console.log('WebSocket connection established');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

let currentGameState = null; // This will store the latest game state received from the server

ws.onmessage = (message) => {
    console.log('Message from server:', message.data);
    const gameState = JSON.parse(message.data).state;
    if (gameState) {
        currentGameState = gameState; // Update the current game state with the latest from the server
        renderGameState(gameState); // Call the rendering function with the parsed game state
    }
};

document.addEventListener('keydown', (event) => {
    const actionMap = {
        'ArrowLeft': 'moveLeft',
        'ArrowRight': 'moveRight',
        'ArrowDown': 'drop',
        'Space': 'rotate'
    };
    const action = actionMap[event.code];

    if (action) {
        event.preventDefault(); // Prevent default behavior here, within the if statement, to specifically target handled keys

        if (ws && ws.readyState === WebSocket.OPEN) {
            try {
                // Modify the message being sent to include the current game state if available
                const message = { action };
                if (currentGameState) {
                    message.gameState = currentGameState; // Include the game state in the message if it exists
                }

                ws.send(JSON.stringify(message));
                console.log(`Action sent: ${action}, with gameState: ${currentGameState ? 'Included' : 'Not included'}`);
            } catch (error) {
                console.error('Error sending action to server:', error);
            }
        } else {
            console.log(`Unsupported key or WebSocket connection not open. Key: ${event.code}`);
        }
    }
});

function renderGameState(gameState) {
    const gameBoard = document.getElementById('gameBoard');
    if (!gameBoard) {
        console.error('Game board element not found.');
        return;
    }

    gameBoard.innerHTML = ''; // Clear the game board

    gameState.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.style.width = '20px'; // Assuming each cell is 20px by 20px
            cellElement.style.height = '20px';
            cellElement.style.float = 'left'; // Align cells next to each other

            // Determine if the current cell is part of the active piece
            let isActivePieceCell = false;
            if (gameState.currentPiece) {
                const { shape, position, rotation } = gameState.currentPiece;
                const shapePositions = getShapePositions(shape, position, rotation);
                shapePositions.forEach(([x, y]) => {
                    if (x === colIndex && y === rowIndex) {
                        isActivePieceCell = true;
                    }
                });
            }

            // Apply distinct colors based on cell state
            if (isActivePieceCell) {
                cellElement.classList.add('activePiece'); // Use class for active piece
            } else if (cell) {
                cellElement.classList.add('filledCell'); // Use class for filled cells
            } else {
                // Ensure empty cells remain transparent
                cellElement.style.backgroundColor = ''; // Empty cells remain transparent
            }

            gameBoard.appendChild(cellElement);
        });
    });

    console.log('Game state rendered.');
}

function getShapePositions(shape, position, rotation) {
    const positions = [];
    // This switch will handle rotation and shape to calculate positions
    switch (shape) {
        case 'I':
            if (rotation === 0 || rotation === 180) {
                for (let i = 0; i < 4; i++) {
                    positions.push([position.x + i, position.y]);
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    positions.push([position.x, position.y + i]);
                }
            }
            break;
        case 'O':
            positions.push([position.x, position.y], [position.x + 1, position.y], [position.x, position.y + 1], [position.x + 1, position.y + 1]);
            break;
        case 'T':
            if (rotation === 0) {
                positions.push([position.x, position.y], [position.x - 1, position.y], [position.x + 1, position.y], [position.x, position.y + 1]);
            } else if (rotation === 90) {
                positions.push([position.x, position.y], [position.x, position.y - 1], [position.x + 1, position.y], [position.x, position.y + 1]);
            } else if (rotation === 180) {
                positions.push([position.x, position.y], [position.x + 1, position.y], [position.x - 1, position.y], [position.x, position.y - 1]);
            } else if (rotation === 270) {
                positions.push([position.x, position.y], [position.x, position.y + 1], [position.x - 1, position.y], [position.x, position.y - 1]);
            }
            break;
        // Add cases for other shapes and rotations
    }
    return positions;
}