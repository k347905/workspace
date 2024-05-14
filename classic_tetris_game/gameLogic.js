class TetrisGameLogic {
  constructor() {
    this.grid = this.createGrid(20, 10); // 20 rows, 10 columns
    this.currentPiece = this.generateNewPiece();
    this.nextPiece = this.generateNewPiece();
    this.pieceShapes = {
      I: [
        [1, 1, 1, 1]
      ],
      J: [
        [0, 0, 1],
        [1, 1, 1]
      ],
      L: [
        [1, 0, 0],
        [1, 1, 1]
      ],
      O: [
        [1, 1],
        [1, 1]
      ],
      S: [
        [0, 1, 1],
        [1, 1, 0]
      ],
      T: [
        [0, 1, 0],
        [1, 1, 1]
      ],
      Z: [
        [1, 1, 0],
        [0, 1, 1]
      ]
    };
  }

  createGrid(rows, columns) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      grid.push(new Array(columns).fill(0));
    }
    return grid;
  }

  generateNewPiece() {
    const pieces = 'IJLOSTZ';
    const shape = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      shape,
      position: { x: 4, y: 0 }, // Starting position
      rotation: 0, // 0 degrees
    };
  }

  rotatePiece() {
    const originalRotation = this.currentPiece.rotation;
    this.currentPiece.rotation = (this.currentPiece.rotation + 90) % 360;
    if (this.checkCollision(true)) {
      this.currentPiece.rotation = originalRotation;
      console.log('Collision detected after rotation. Rotation reverted.');
    } else {
      console.log('Piece rotated to', this.currentPiece.rotation);
      this.logPieceShape(); // Log the current shape for debugging
    }
  }

  movePiece(direction) {
    const originalPosition = { ...this.currentPiece.position };
    switch (direction) {
      case 'left':
        this.currentPiece.position.x -= 1;
        break;
      case 'right':
        this.currentPiece.position.x += 1;
        break;
      case 'down':
        this.currentPiece.position.y += 1;
        break;
    }
    if (this.checkCollision()) {
      this.currentPiece.position = originalPosition;
      console.log(`Collision detected after moving ${direction}. Move reverted.`);
    } else {
      console.log(`Piece moved ${direction}`);
    }
  }

  checkCollision(isRotationCheck = false) {
    const { x, y } = this.currentPiece.position;
    const shape = this.getPieceShape();
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const newX = x + col;
          const newY = y + row;
          if (newY >= this.grid.length || newX < 0 || newX >= this.grid[0].length || this.grid[newY][newX]) {
            console.log('Collision detected');
            return true;
          }
        }
      }
    }
    // Additional check to prevent rotation when the piece is at the bottom
    if (isRotationCheck) {
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const testX = x + col;
            const testY = y + row;
            // Check for left and right boundary during rotation
            if (testX < 0 || testX >= this.grid[0].length || testY >= this.grid.length || this.grid[testY][testX]) {
              console.log('Rotation would place piece out of bounds.');
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  getPieceShape() {
    const shape = this.pieceShapes[this.currentPiece.shape];
    let rotatedShape = shape;
    const { rotation } = this.currentPiece;
    if (rotation === 90) {
      rotatedShape = [];
      for (let y = 0; y < shape[0].length; y++) {
        rotatedShape.push([]);
        for (let x = 0; x < shape.length; x++) {
          rotatedShape[y].push(shape[shape.length - 1 - x][y]);
        }
      }
    } else if (rotation === 180) {
      rotatedShape = shape.map(row => row.slice().reverse()).reverse();
    } else if (rotation === 270) {
      rotatedShape = [];
      for (let y = 0; y < shape[0].length; y++) {
        rotatedShape.push([]);
        for (let x = 0; x < shape.length; x++) {
          rotatedShape[y].push(shape[x][shape[0].length - 1 - y]);
        }
      }
    }
    return rotatedShape;
  }

  lockPiece() {
    const shape = this.getPieceShape();
    const { position } = this.currentPiece;
    shape.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          this.grid[position.y + i][position.x + j] = 1;
        }
      });
    });
    console.log('Piece locked');
    this.currentPiece = this.nextPiece;
    this.nextPiece = this.generateNewPiece();
  }

  clearLines() {
    for (let i = this.grid.length - 1; i >= 0; i--) {
      if (this.grid[i].every(cell => cell === 1)) {
        this.grid.splice(i, 1);
        this.grid.unshift(new Array(10).fill(0));
        i++; // Adjust index to recheck the new row at this index
        console.log('Line cleared at row', i);
      }
    }
    console.log('Lines cleared');
  }

  update() {
    this.movePiece('down');
    if (this.checkCollision()) {
      // Before locking the piece, check if it's at the bottom or on top of another piece
      this.lockPiece();
      this.clearLines();
      console.log('Game state updated, new piece generated.');
    } else {
      // If no collision detected with the bottom or another piece, check if the piece has reached the bottom of the grid
      if (this.currentPiece.position.y + this.getPieceShape().length === this.grid.length) {
        this.lockPiece();
        this.clearLines();
        console.log('Piece reached the bottom and locked, new piece generated.');
      }
    }
  }

  logPieceShape() {
    // Log the current piece shape for debugging purposes
    const shape = this.getPieceShape();
    console.log(`Current piece shape at rotation ${this.currentPiece.rotation}:`);
    shape.forEach(row => console.log(row.join(' ')));
  }
}

module.exports = TetrisGameLogic;