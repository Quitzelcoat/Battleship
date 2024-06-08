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

        // Mark hits on individual cells ONLY IF NOT SUNK
        if (ship && ship.hits > 0 && !ship.isSunk()) {
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
          const startX = ship.isVertical ? x : x - ship.hits + 1;
          const startY = ship.isVertical ? y - ship.hits + 1 : y;

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

export default dom;
