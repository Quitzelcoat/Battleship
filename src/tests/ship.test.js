import Ship from "../components/ship";

test("ship should be created with correct length", () => {
  const ship = Ship(3);
  expect(ship.length).toBe(3);
});

test("ship should not be sunk initially", () => {
  const ship = Ship(3);
  expect(ship.isSunk()).toBe(false);
});

test("ship should be sunk after being hit enough times", () => {
  const ship = Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
