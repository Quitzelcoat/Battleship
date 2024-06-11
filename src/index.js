import Player from "./components/players.js";
// import Ship from "./components/ship.js";
import dom from "./components/dom.js";

const humanPlayer = Player("human");
const computerPlayer = Player("computer");
let currentPlayer = humanPlayer;

let gameStarted = false;
humanPlayer.placeShipsRandomly();
computerPlayer.placeShipsRandomly();

const domFunctions = dom();

const computerBoardContainer = document.getElementById("computerBoard");
const humanBoardContainer = document.getElementById("playerBoard");

// create the game boards
function createBoard() {
  if (humanBoardContainer && computerBoardContainer) {
    domFunctions.renderBoard(humanPlayer.gameboard, "playerBoard");
    domFunctions.renderBoard(computerPlayer.gameboard, "computerBoard");
  } else {
    console.error("Board containers not found in the DOM.");
  }
}

// computer turn
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

    for (const hitCell of humanPlayer.gameboard.hitShipCells) {
      const cellId = `playerBoard-${hitCell.x}-${hitCell.y}`;
      const cell = document.getElementById(cellId);
      if (cell) {
        cell.classList.add("hit");
      } else {
        console.error(`Cell with ID ${cellId} not found`);
      }
    }

    if (humanPlayer.gameboard.areAllShipsSunk()) {
      alert("Computer wins!");
    } else {
      currentPlayer = humanPlayer;
    }
  }, 0);
}

// Player turn
function PlayPlayerTurn(event) {
  if (!currentPlayer.isComputer) {
    const cell = event.target;
    if (
      cell.classList.contains("eachCell") &&
      !cell.classList.contains("hit") &&
      !cell.classList.contains("miss")
    ) {
      const cellId = cell.id;
      const [x, y] = cellId.split("-").slice(1).map(Number);

      const attackResult = humanPlayer.attack(x, y, computerPlayer.gameboard);
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
        console.log("Invalid attack. Please try again.");
      }
    }
  }
}

//creating the board
createBoard();

const placeShipsButton = document.getElementById("placeShipsRandomly");
const startGameButton = document.getElementById("startGame");

// play the game
startGameButton.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    computerBoardContainer.addEventListener("click", (event) => {
      PlayPlayerTurn(event);
    });
    placeShipsButton.style.display = "none";
    startGameButton.style.display = "none";
  }
});

// place the ships
placeShipsButton.addEventListener("click", () => {
  if (!gameStarted) {
    humanPlayer.gameboard.reset();
    computerPlayer.gameboard.reset();

    humanPlayer.placeShipsRandomly();
    computerPlayer.placeShipsRandomly();

    domFunctions.renderBoard(humanPlayer.gameboard, "playerBoard");
    domFunctions.renderBoard(computerPlayer.gameboard, "computerBoard");
  }
});
