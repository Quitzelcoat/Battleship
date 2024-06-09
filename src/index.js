import Player from "./components/players.js";
// import Ship from "./components/ship.js";
import dom from "./components/dom.js";

// gameboard example run.
const humanPlayer = Player("human");
const computerPlayer = Player("computer");
let currentPlayer = humanPlayer;

humanPlayer.placeShipsRandomly();
computerPlayer.placeShipsRandomly();

const domFunctions = dom();

const computerBoardContainer = document.getElementById("computerBoard");
const humanBoardContainer = document.getElementById("playerBoard");

function createBoard() {
  // Check if elements exist
  if (humanBoardContainer && computerBoardContainer) {
    domFunctions.renderBoard(humanPlayer.gameboard, "playerBoard");
    domFunctions.renderBoard(computerPlayer.gameboard, "computerBoard");
  } else {
    console.error("Board containers not found in the DOM.");
  }
}

function playComputerTurn() {
  setTimeout(() => {
    let attackResult;
    do {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      attackResult = computerPlayer.attack(x, y, humanPlayer.gameboard);
    } while (attackResult === "invalid");

    domFunctions.updateBoard(humanPlayer.gameboard, "playerBoard");

    if (!humanPlayer.gameboard.areAllShipsSunk()) {
      domFunctions.updateBoard(computerPlayer.gameboard, "computerBoard");
    }

    if (humanPlayer.gameboard.areAllShipsSunk()) {
      alert("Computer wins!");
    } else {
      currentPlayer = humanPlayer;
    }
  }, 0);
}

function PlayPlayerTurn(event) {
  if (!currentPlayer.isComputer) {
    domFunctions.updateBoard(humanPlayer.gameboard, "playerBoard");
    domFunctions.updateBoard(computerPlayer.gameboard, "computerBoard");

    const cell = event.target;
    if (
      cell.classList.contains("eachCell") &&
      !cell.classList.contains("hit") &&
      !cell.classList.contains("miss")
    ) {
      const cellId = cell.id;
      const [x, y] = cellId.split("-").slice(1);

      const attackResult = humanPlayer.attack(
        parseInt(x),
        parseInt(y),
        computerPlayer.gameboard
      );
      domFunctions.updateBoard(computerPlayer.gameboard, "computerBoard");

      if (attackResult !== "invalid") {
        domFunctions.updateBoard(computerPlayer.gameboard, "computerBoard");
        if (attackResult === "hit") {
          cell.classList.add("hit");
        } else if (attackResult === "miss") {
          cell.classList.add("miss");
        }

        if (computerPlayer.gameboard.areAllShipsSunk()) {
          alert("You win!");
        } else {
          currentPlayer = computerPlayer;
          playComputerTurn();
        }
      } else {
        // Handle invalid attack (e.g., display a message)
        console.log("Invalid attack. Please try again."); // Or show an alert
      }
    }
  }
}

//dom show and minipulation
document.addEventListener("DOMContentLoaded", () => {
  createBoard();

  computerBoardContainer.addEventListener("click", (event) => {
    PlayPlayerTurn(event);
  });
});
