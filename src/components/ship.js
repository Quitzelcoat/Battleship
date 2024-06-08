const Ship = (length) => {
  let hits = 0;
  let isSunkAlready = false;

  function hit() {
    hits++;
    return hits >= length ? "sunk" : "hit";
  }

  function isSunk() {
    return hits >= length;
  }

  function markSunk() {
    isSunkAlready = true;
  }

  return {
    length,
    get hits() {
      return hits; // Use a getter for hits
    },
    hit,
    isSunk,
    markSunk,
    isMarkedSunk: () => isSunkAlready,
  }; // Added markSunk and isMarkedSunk methods
};

export default Ship;
