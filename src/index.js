import Player from "./components/players.js";
import Ship from "./components/ship.js";
import dom from "./components/dom.js";

// gameboard example run.
const humanPlayer = Player("human");
const computerPlayer = Player("computer");

humanPlayer.gameboard.placeShip(Ship(5), 0, 0, true);
humanPlayer.gameboard.placeShip(Ship(4), 2, 2);
humanPlayer.gameboard.placeShip(Ship(3), 4, 4, true);
humanPlayer.gameboard.placeShip(Ship(3), 6, 0);
humanPlayer.gameboard.placeShip(Ship(2), 8, 8);

console.log("Human Player Gameboard:");
console.table(humanPlayer.gameboard.board);

computerPlayer.placeShipsRandomly();

console.log("Computer Player Gameboard:");
console.table(computerPlayer.gameboard.board);

//dom show and minipulation
document.addEventListener("DOMContentLoaded", () => {
  const humanBoardContainer = document.getElementById("playerBoard");
  const computerBoardContainer = document.getElementById("computerBoard");

  // Check if elements exist
  if (humanBoardContainer && computerBoardContainer) {
    const domFunctions = dom();
    domFunctions.renderBoard(humanPlayer.gameboard, "playerBoard");
    domFunctions.renderBoard(computerPlayer.gameboard, "computerBoard");
  } else {
    console.error("Board containers not found in the DOM.");
  }
});
