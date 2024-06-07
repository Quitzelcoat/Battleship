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

        if (ship && ship.isSunk()) {
          cell.classList.add("sunk");
        } else {
          if (
            cell.classList.contains("hit") ||
            cell.classList.contains("miss")
          ) {
            continue;
          }

          cell.classList.remove("hit", "miss");

          if (ship && ship.hits > 0) {
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
  }

  return {
    renderBoard,
    updateBoard,
  };
};

export default dom;
