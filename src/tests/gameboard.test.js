import Ship from "../components/ship";
import Gameboard from "../components/gameboard";

describe("Gameboard", () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = Gameboard();
    ship = Ship(3);
  });

  test("places ship horizontally", () => {
    expect(gameboard.placeShip(ship, 0, 0)).toBe(true);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
  });

  test("places ship vertically", () => {
    expect(gameboard.placeShip(ship, 0, 0, true)).toBe(true);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
  });

  test("rejects invalid ship placements (out of bounds)", () => {
    expect(gameboard.placeShip(ship, 9, 9)).toBe(false);
    expect(gameboard.placeShip(ship, 0, 9, true)).toBe(false);
  });

  test("rejects invalid ship placements (overlapping)", () => {
    gameboard.placeShip(ship, 0, 0);
    expect(gameboard.placeShip(ship, 1, 0)).toBe(false);
  });

  test("registers hit on ship", () => {
    gameboard.placeShip(ship, 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(ship.isSunk()).toBe(false);
  });

  test("registers miss", () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missedAttacks).toHaveLength(1);
    expect(gameboard.missedAttacks[0]).toEqual({ x: 0, y: 0 });
  });

  test("reports all ships sunk", () => {
    gameboard.placeShip(ship, 0, 0);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);
    expect(gameboard.areAllShipsSunk()).toBe(true);
  });

  test("reports not all ships sunk", () => {
    gameboard.placeShip(ship, 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.areAllShipsSunk()).toBe(false);
  });
});
