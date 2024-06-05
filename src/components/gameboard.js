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
    const ship = board[y][x];
    if (ship) {
      ship.hit();
    } else {
      missedAttacks.push({ x, y });
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
  };
};

export default Gameboard;
