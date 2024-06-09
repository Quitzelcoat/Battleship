const Gameboard = () => {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));

  const missedAttacks = [];

  const placeShip = (ship, x, y, isVertical = false) => {
    if (!isValidPlacement(ship, x, y, isVertical)) {
      return false;
    }

    for (let i = 0; i < ship.length; i++) {
      const xCoord = isVertical ? x : x + i;
      const yCoord = isVertical ? y + i : y;
      board[yCoord][xCoord] = ship;
    }

    // Set the ship's position after successful placement
    ship.setPosition(x, y, isVertical);
    return true;
  };

  const isValidPlacement = (ship, x, y, isVertical) => {
    for (let i = 0; i < ship.length; i++) {
      const xCoord = isVertical ? x : x + i;
      const yCoord = isVertical ? y + i : y;

      if (
        xCoord < 0 ||
        xCoord >= 10 ||
        yCoord < 0 ||
        yCoord >= 10 ||
        (board[yCoord] && board[yCoord][xCoord] !== null)
      ) {
        return false;
      }
    }
    return true;
  };

  const receiveAttack = (x, y) => {
    // Check if the cell has a ship and it's already been hit
    const cell = board[y][x];
    if (cell && cell.hits > 0) {
      console.log(`Invalid attack: Cell at (${x}, ${y}) already hit.`);
      return "invalid";
    }

    if (cell) {
      const position = cell.isVertical ? y - cell.y : x - cell.x;
      const attackResult = cell.hit(position);
      console.log(`Hit at (${x}, ${y})! Ship hits: ${cell.hits}`);
      return attackResult;
    } else {
      missedAttacks.push({ x, y });
      console.log(`Missed at (${x}, ${y})`);
      return "miss";
    }
  };

  const areAllShipsSunk = () => {
    for (const row of board) {
      for (const cell of row) {
        if (cell && !cell.isSunk()) {
          return false;
        }
      }
    }
    return true;
  };

  const checkSunkenShips = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] && board[i][j].isSunk()) {
          board[i][j].markSunk(); // Mark ship as sunk
          return board[i][j]; // Return the sunk ship
        }
      }
    }
    return null; // No ship was sunk
  };

  return {
    placeShip,
    receiveAttack,
    areAllShipsSunk,
    get board() {
      return board;
    },
    get missedAttacks() {
      return missedAttacks;
    },
    checkSunkenShips,
  };
};

export default Gameboard;
