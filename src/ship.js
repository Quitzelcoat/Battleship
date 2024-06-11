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

export default Ship;
