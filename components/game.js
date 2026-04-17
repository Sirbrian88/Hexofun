
export const HiveGame = {
  setup: () => ({
    cells: {},
    inventory: {
      '0': { Queen: 1, Ant: 3, Spider: 2, Beetle: 2, Grasshopper: 3 },
      '1': { Queen: 1, Ant: 3, Spider: 2, Beetle: 2, Grasshopper: 3 },
    },
    turnCount: 0
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    placePiece: ({ G, ctx, playerID }, type, q, r) => {
      const cellKey = `${q},${r}`;
      if (G.cells[cellKey]) return;
      if (G.inventory[playerID][type] <= 0) return;

      G.cells[cellKey] = { type, player: playerID };
      G.inventory[playerID][type]--;
      G.turnCount++;
    },
  },
};
