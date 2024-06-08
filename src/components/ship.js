const Ship = (length) => {
  let hits = 0;
  let isSunkAlready = false;

  function hit() {
    hits++;
  }

  function isSunk() {
    return hits >= length;
  }

  function markSunk() {
    isSunkAlready = true;
  }

  return {
    length,
    hit,
    isSunk,
    markSunk,
    isMarkedSunk: () => isSunkAlready,
  }; // Added markSunk and isMarkedSunk methods
};

export default Ship;
