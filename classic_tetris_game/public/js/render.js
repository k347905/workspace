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

            if (isActivePieceCell) {
                cellElement.classList.add('activePiece'); // Use class for active piece
            } else if (cell) {
                cellElement.classList.add('filledCell'); // Use class for filled cells
            } else {
                cellElement.style.backgroundColor = ''; // Empty cells remain transparent
            }

            gameBoard.appendChild(cellElement);
        });
    });

    console.log('Game state rendered.');
}

function getShapePositions(shape, position, rotation) {
    const positions = [];
    console.log(`Calculating positions for shape: ${shape}, rotation: ${rotation}`);
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
        case 'L':
            if (rotation === 0) {
                positions.push([position.x, position.y], [position.x, position.y + 1], [position.x, position.y + 2], [position.x + 1, position.y + 2]);
            } else if (rotation === 90) {
                positions.push([position.x, position.y], [position.x + 1, position.y], [position.x + 2, position.y], [position.x, position.y + 1]);
            } else if (rotation === 180) {
                positions.push([position.x, position.y], [position.x - 1, position.y], [position.x - 1, position.y - 1], [position.x - 1, position.y - 2]);
            } else if (rotation === 270) {
                positions.push([position.x, position.y], [position.x, position.y + 1], [position.x - 1, position.y + 1], [position.x - 2, position.y]);
            }
            break;
        case 'J':
            if (rotation === 0) {
                positions.push([position.x, position.y], [position.x, position.y + 1], [position.x, position.y + 2], [position.x - 1, position.y]);
            } else if (rotation === 90) {
                positions.push([position.x, position.y], [position.x + 1, position.y], [position.x + 2, position.y], [position.x, position.y + 1]);
            } else if (rotation === 180) {
                positions.push([position.x, position.y], [position.x + 1, position.y], [position.x, position.y - 1], [position.x, position.y - 2]);
            } else if (rotation === 270) {
                positions.push([position.x, position.y], [position.x, position.y - 1], [position.x - 1, position.y], [position.x - 2, position.y]);
            }
            break;
        case 'S':
            if (rotation === 0 || rotation === 180) {
                positions.push([position.x, position.y], [position.x + 1, position.y], [position.x + 1, position.y + 1], [position.x + 2, position.y + 1]);
            } else {
                positions.push([position.x, position.y], [position.x, position.y + 1], [position.x - 1, position.y + 1], [position.x - 1, position.y + 2]);
            }
            break;
        case 'Z':
            if (rotation === 0 || rotation === 180) {
                positions.push([position.x, position.y], [position.x - 1, position.y + 1], [position.x, position.y + 1], [position.x + 1, position.y]);
            } else {
                positions.push([position.x, position.y], [position.x, position.y + 1], [position.x + 1, position.y + 1], [position.x + 1, position.y + 2]);
            }
            break;
        // Add cases for other shapes and rotations as needed
    }
    console.log(`Positions for shape: ${shape}, rotation: ${rotation}`, positions);
    return positions;
}