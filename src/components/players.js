import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const Player = (type) => {
  const gameboard = Gameboard();
  let isComputer = type === "computer";

  const attack = (x, y, opponentBoard) => {
    if (isComputer) {
      const validAttacks = [];
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (
            !opponentBoard.board[i][j] &&
            !opponentBoard.missedAttacks.some(
              (attack) => attack.y === j && attack.x === i
            )
          ) {
            validAttacks.push({ x: j, y: i });
          }
        }
      }
      const randomIndex = Math.floor(Math.random() * validAttacks.length);
      x = validAttacks[randomIndex].x;
      y = validAttacks[randomIndex].y;
    }

    opponentBoard.receiveAttack(x, y);
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
