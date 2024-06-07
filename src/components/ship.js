const Ship = (length) => {
  let hits = 0;

  function hit() {
    hits++;
  }

  function isSunk() {
    return hits >= length;
  }

  let isSunkAlready = false;
  function markSunk() {
    isSunkAlready = true;
  }

  return { length, hit, isSunk, markSunk, isMarkedSunk: () => isSunkAlready }; // Added markSunk and isMarkedSunk methods
};

export default Ship;
