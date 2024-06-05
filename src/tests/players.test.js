import Player from "../components/players";

describe("Player", () => {
  let humanPlayer;
  let computerPlayer;

  beforeEach(() => {
    humanPlayer = Player("human");
    computerPlayer = Player("computer");
  });

  test("creates human and computer players", () => {
    expect(humanPlayer.isComputer).toBe(false);
    expect(computerPlayer.isComputer).toBe(true);
  });

  test("player attacks opponent board", () => {
    humanPlayer.attack(5, 5, computerPlayer.gameboard);
    expect(computerPlayer.gameboard.missedAttacks).toHaveLength(1);
  });

  // Add tests for computer player's random attack logic
});
