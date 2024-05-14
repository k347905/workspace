const { getShapePositions } = require('../public/js/render'); // Assuming the function is exported for testing

describe('getShapePositions function tests', () => {
  const shapes = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const rotations = [0, 90, 180, 270];
  const positions = {
    I: {
      0: [[4, 0], [5, 0], [6, 0], [7, 0]],
      90: [[5, -1], [5, 0], [5, 1], [5, 2]],
      180: [[4, 0], [5, 0], [6, 0], [7, 0]],
      270: [[5, -1], [5, 0], [5, 1], [5, 2]]
    },
    J: {
      0: [[4, 0], [4, 1], [5, 1], [6, 1]],
      90: [[5, 0], [6, 0], [5, 1], [5, 2]],
      180: [[4, 1], [5, 1], [6, 1], [6, 0]],
      270: [[5, 0], [5, 1], [5, 2], [4, 2]]
    },
    L: {
      0: [[6, 0], [4, 1], [5, 1], [6, 1]],
      90: [[5, 0], [5, 1], [5, 2], [6, 2]],
      180: [[4, 1], [5, 1], [6, 1], [4, 0]],
      270: [[4, 0], [5, 0], [5, 1], [5, 2]]
    },
    O: {
      0: [[4, 0], [5, 0], [4, 1], [5, 1]],
      90: [[4, 0], [5, 0], [4, 1], [5, 1]],
      180: [[4, 0], [5, 0], [4, 1], [5, 1]],
      270: [[4, 0], [5, 0], [4, 1], [5, 1]]
    },
    S: {
      0: [[5, 0], [6, 0], [4, 1], [5, 1]],
      90: [[4, 0], [4, 1], [5, 1], [5, 2]],
      180: [[5, 0], [6, 0], [4, 1], [5, 1]],
      270: [[4, 0], [4, 1], [5, 1], [5, 2]]
    },
    T: {
      0: [[5, 0], [4, 1], [5, 1], [6, 1]],
      90: [[5, 0], [4, 1], [5, 1], [5, 2]],
      180: [[4, 1], [5, 1], [6, 1], [5, 2]],
      270: [[5, 0], [5, 1], [6, 1], [5, 2]]
    },
    Z: {
      0: [[4, 0], [5, 0], [5, 1], [6, 1]],
      90: [[5, 0], [4, 1], [5, 1], [4, 2]],
      180: [[4, 0], [5, 0], [5, 1], [6, 1]],
      270: [[5, 0], [4, 1], [5, 1], [4, 2]]
    }
  };

  shapes.forEach(shape => {
    rotations.forEach(rotation => {
      test(`Shape ${shape} with rotation ${rotation} should return correct positions`, () => {
        const expectedPositions = positions[shape][rotation];
        const result = getShapePositions(shape, { x: 4, y: 0 }, rotation);
        expect(result).toEqual(expect.arrayContaining(expectedPositions));
        expect(result.length).toBe(expectedPositions.length);
      });
    });
  });
});