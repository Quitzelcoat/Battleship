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

        if (gameboard.board[y][x]) {
          cell.classList.add("ship");
        }

        boardContainer.appendChild(cell);
      }
    }
  };

  return {
    renderBoard,
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
      const validAttacks = [];
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (
            !opponentBoard.board[i][j] &&
            !!opponentBoard.missedAttacks.some(
              (attack) => attack.x === j && attack.y === i
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
  let hits = 0;

  function hit() {
    hits++;
  }

  function isSunk() {
    return hits >= length;
  }

  return { length, hit, isSunk };
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
/* harmony import */ var _components_ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ship.js */ "./src/components/ship.js");
/* harmony import */ var _components_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/dom.js */ "./src/components/dom.js");




// gameboard example run.
const humanPlayer = (0,_components_players_js__WEBPACK_IMPORTED_MODULE_0__["default"])("human");
const computerPlayer = (0,_components_players_js__WEBPACK_IMPORTED_MODULE_0__["default"])("computer");

humanPlayer.gameboard.placeShip((0,_components_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"])(5), 0, 0, true);
humanPlayer.gameboard.placeShip((0,_components_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"])(4), 2, 2);
humanPlayer.gameboard.placeShip((0,_components_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"])(3), 4, 4, true);
humanPlayer.gameboard.placeShip((0,_components_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"])(3), 6, 0);
humanPlayer.gameboard.placeShip((0,_components_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"])(2), 8, 8);

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
    const domFunctions = (0,_components_dom_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
    domFunctions.renderBoard(humanPlayer.gameboard, "playerBoard");
    domFunctions.renderBoard(computerPlayer.gameboard, "computerBoard");
  } else {
    console.error("Board containers not found in the DOM.");
  }
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map