const dom = () => {
  const renderBoard = (gameboard, boardId) => {
    const boardContainer = document.getElementById(boardId);
    boardContainer.innerHTML = "";

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("div");
        cell.id = `${boardId}-${x}-${y}`;
        cell.dataset.x = x; // Add x data attribute
        cell.dataset.y = y; // Add y data attribute
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

        cell.classList.remove("hit", "miss", "sunk");

        const ship = gameboard.board[y][x];
        if (ship && ship.isSunk()) {
          for (let i = 0; i < ship.length; i++) {
            let sunkX = ship.isVertical ? x : x + i;
            let sunkY = ship.isVertical ? y + i : y;
            const sunkCell = document.getElementById(
              `${boardId}-${sunkX}-${sunkY}`
            );
            sunkCell.classList.add("sunk");
          }
        } else if (ship && ship.hits > 0) {
          cell.classList.add("hit");
        } else if (
          gameboard.missedAttacks.some(
            (attack) => attack.x === x && attack.y === y
          )
        ) {
          cell.classList.add("miss");
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
