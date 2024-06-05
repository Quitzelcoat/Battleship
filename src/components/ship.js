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

export default Ship;
