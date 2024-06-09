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

        // Clear existing classes
        cell.classList.remove("hit", "miss", "sunk");

        // Mark hits on individual cells if they are not part of a sunk ship
        if (ship && ship.hits[y - ship.y] && !ship.isSunk()) {
          cell.classList.add("hit");
        }

        // Mark misses based on missedAttacks array
        if (
          gameboard.missedAttacks.some(
            (attack) => attack.x === x && attack.y === y
          )
        ) {
          cell.classList.add("miss");
        }

        // Mark sunk ships (all cells)
        if (ship && ship.isSunk()) {
          const shipLength = ship.length;
          const startX = ship.isVertical ? ship.x : ship.x; // Use ship's original x coordinate for startX
          const startY = ship.isVertical ? ship.y : ship.y; // Use ship's original y coordinate for startY

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
    if (
      (board[y][x] && board[y][x].isMarkedSunk()) ||
      missedAttacks.some((attack) => attack.x === x && attack.y === y)
    ) {
      // If already attacked, do nothing
      console.log(`Invalid attack: Cell at (${x}, ${y}) already attacked.`);
      return "invalid";
    }

    const ship = board[y][x];
    if (ship) {
      const position = ship.isVertical ? y - ship.y : x - ship.x;
      const attackResult = ship.hit(position);
      console.log(`Hit at (${x}, ${y})! Ship hits: ${ship.hits}`);
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

        // Correct the condition to allow attacks on cells with ships
        validAttack = !opponentBoard.missedAttacks.some(
          (attack) => attack.x === x && attack.y === y
        ); // Remove the check for !opponentBoard.board[y][x]
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
          opponentBoard.board[sunkY][sunkX].markSunk(); // Mark the cell as sunk
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

  // Add properties for coordinates and orientation
  let x, y, isVertical;

  function setPosition(newX, newY, newIsVertical) {
    x = newX;
    y = newY;
    isVertical = newIsVertical;
  }

  function hit(position) {
    if (!hits[position]) {
      hits[position] = true;
    }
    return hits.every((hit) => hit) ? "sunk" : "hit";
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


// gameboard example run.
const humanPlayer = (0,_components_players_js__WEBPACK_IMPORTED_MODULE_0__["default"])("human");
const computerPlayer = (0,_components_players_js__WEBPACK_IMPORTED_MODULE_0__["default"])("computer");
let currentPlayer = humanPlayer;

humanPlayer.placeShipsRandomly();
computerPlayer.placeShipsRandomly();

const domFunctions = (0,_components_dom_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

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
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    computerPlayer.attack(x, y, humanPlayer.gameboard);

    domFunctions.updateBoard(humanPlayer.gameboard, "playerBoard");
    domFunctions.updateBoard(computerPlayer.gameboard, "computerBoard");

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

})();

/******/ })()
;
//# sourceMappingURL=main.js.map