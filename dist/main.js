/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/dom.js":
/*!*******************************!*\
  !*** ./src/components/dom.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dom = () => {
  const renderBoard = (gameboard, boardId) => {
    const boardContainer = document.getElementById(boardId);
    boardContainer.innerHTML = "";

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("div");
        cell.id = `${boardId}-${x}-${y}`;
        cell.dataset.x = x;
        cell.dataset.y = y;
        cell.classList.add("eachCell");

        if (gameboard.board[y][x]) {
          cell.classList.add("ship");
        }

        boardContainer.appendChild(cell);
      }
    }
  };

  function updateBoard(gameboard, boardId) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cellId = `${boardId}-${x}-${y}`;
        const cell = document.getElementById(cellId);

        if (!cell) {
          console.error(`Cell with ID ${cellId} not found.`);
          continue;
        }

        const ship = gameboard.board[y][x];

        if (ship && ship.hits[ship.isVertical ? x - ship.x : y - ship.y]) {
          cell.classList.add("hit");
        }

        if (
          gameboard.missedAttacks.some(
            (attack) => attack.x === x && attack.y === y
          )
        ) {
          cell.classList.add("miss");
        }

        if (ship && ship.isSunk()) {
          const shipLength = ship.length;
          const startX = ship.x;
          const startY = ship.y;

          for (let i = 0; i < shipLength; i++) {
            const sunkX = ship.isVertical ? startX : startX + i;
            const sunkY = ship.isVertical ? startY + i : startY;
            const sunkCellId = `${boardId}-${sunkX}-${sunkY}`;
            const sunkCell = document.getElementById(sunkCellId);
            if (sunkCell) {
              sunkCell.classList.add("sunk");
            }
          }
        }
      }
    }
  }

  return {
    renderBoard,
    updateBoard,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);


/***/ }),

/***/ "./src/components/gameboard.js":
/*!*************************************!*\
  !*** ./src/components/gameboard.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);


/***/ }),

/***/ "./src/components/players.js":
/*!***********************************!*\
  !*** ./src/components/players.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/components/gameboard.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ "./src/components/ship.js");



const Player = (type) => {
  const gameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
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

        const ship = (0,_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"])(length);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ "./src/components/ship.js":
/*!********************************!*\
  !*** ./src/components/ship.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = (length) => {
  const hits = Array(length).fill(false);
  let isSunkAlready = false;

  let x, y, isVertical;

  function setPosition(newX, newY, newIsVertical) {
    x = newX;
    y = newY;
    isVertical = newIsVertical;
  }

  function hit(position) {
    if (position >= 0 && position < this.length && !hits[position]) {
      hits[position] = true;
      return hits.every((hit) => hit) ? "sunk" : "hit";
    } else {
      return "invalid";
    }
  }

  function isSunk() {
    return hits.every((hit) => hit);
  }

  function markSunk() {
    isSunkAlready = true;
  }

  return {
    length,
    get hits() {
      return hits.filter((hit) => hit).length;
    },
    hit,
    isSunk,
    markSunk,
    isMarkedSunk: () => isSunkAlready,

    setPosition,
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get isVertical() {
      return isVertical;
    },
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_players_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/players.js */ "./src/components/players.js");
/* harmony import */ var _components_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dom.js */ "./src/components/dom.js");

// import Ship from "./components/ship.js";


const humanPlayer = (0,_components_players_js__WEBPACK_IMPORTED_MODULE_0__["default"])("human");
const computerPlayer = (0,_components_players_js__WEBPACK_IMPORTED_MODULE_0__["default"])("computer");
let currentPlayer = humanPlayer;

let gameStarted = false;
humanPlayer.placeShipsRandomly();
computerPlayer.placeShipsRandomly();

const domFunctions = (0,_components_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

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

})();

/******/ })()
;
//# sourceMappingURL=main.js.map