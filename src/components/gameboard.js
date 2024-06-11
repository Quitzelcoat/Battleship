const Gameboard = () => {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));
  const missedAttacks = [];

  const hitShipCells = [];

  const storeHitShipCell = (x, y) => {
    hitShipCells.push({ x, y });
  };

  const placeShip = (ship, x, y, isVertical = false) => {
    if (!isValidPlacement(ship, x, y, isVertical)) {
      return false;
    }

    for (let i = 0; i < ship.length; i++) {
      const xCoord = isVertical ? x : x + i;
      const yCoord = isVertical ? y + i : y;
      board[yCoord][xCoord] = ship;
    }

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
    if (
      (board[y][x] && board[y][x].isMarkedSunk()) ||
      missedAttacks.some((attack) => attack.x === x && attack.y === y)
    ) {
      console.log(`Invalid attack: Cell at (${x}, ${y}) already attacked.`);
      return "invalid";
    }

    const ship = board[y][x];
    if (ship) {
      const position = ship.isVertical ? y - ship.y : x - ship.x;
      const attackResult = ship.hit(position);
      if (attackResult === "invalid") {
        console.log(`Invalid attack: Cell at (${x}, ${y}) already hit.`);
        return "invalid";
      }

      storeHitShipCell(x, y);

      return attackResult;
    } else {
      if (!missedAttacks.some((attack) => attack.x === x && attack.y === y)) {
        missedAttacks.push({ x, y });
        return "miss";
      } else {
        console.log(`Invalid attack: Cell at (${x}, ${y}) already missed.`);
        return "invalid";
      }
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
          board[i][j].markSunk();
          return board[i][j];
        }
      }
    }
    return null;
  };

  const reset = () => {
    // Clear the board array
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        board[y][x] = null;
      }
    }

    // Clear the missed attacks and hit ship cells arrays
    missedAttacks.length = 0;
    hitShipCells.length = 0;
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
    reset,
    get hitShipCells() {
      return hitShipCells;
    },
  };
};

export default Gameboard;
