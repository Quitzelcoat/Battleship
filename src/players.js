import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const Player = (type) => {
  const gameboard = Gameboard();
  let isComputer = type === "computer";

  const attack = (x, y, opponentBoard) => {
    if (isComputer) {
      let validAttack = false;
      while (!validAttack) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);

        const cell = document.getElementById(`playerBoard-${x}-${y}`);
        validAttack =
          !opponentBoard.missedAttacks.some(
            (attack) => attack.x === x && attack.y === y
          ) && !cell.classList.contains("hit");
      }
    }

    const attackResult = opponentBoard.receiveAttack(x, y);

    const sunkShipInfo = opponentBoard.checkSunkenShips();
    if (sunkShipInfo) {
      for (let i = 0; i < sunkShipInfo.length; i++) {
        const sunkX = sunkShipInfo.isVertical
          ? sunkShipInfo.x
          : sunkShipInfo.x + i;
        const sunkY = sunkShipInfo.isVertical
          ? sunkShipInfo.y + i
          : sunkShipInfo.y;

        if (sunkX >= 0 && sunkX < 10 && sunkY >= 0 && sunkY < 10) {
          opponentBoard.board[sunkY][sunkX].markSunk();
        }
      }
    }

    return attackResult;
  };

  const placeShipsRandomly = () => {
    const shipLength = [5, 4, 3, 3, 2];

    for (const length of shipLength) {
      let placed = false;

      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const isVertical = Math.random() < 0.5;

        const ship = Ship(length);
        placed = gameboard.placeShip(ship, x, y, isVertical);
      }
    }
  };

  return {
    gameboard,
    attack,
    placeShipsRandomly,
    get isComputer() {
      return isComputer;
    },
  };
};

export default Player;
