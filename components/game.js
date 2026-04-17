
export const HiveGame = {
  setup: () => ({
    cells: {}, // Format: "q,r": { type: 'Queen', player: '0' }
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
      // Basic check: is the spot empty?
      if (G.cells[cellKey]) return;
      
      // Basic check: does player have the piece?
      if (G.inventory[playerID][type] <= 0) return;

      // Update state
      G.cells[cellKey] = { type, player: playerID };
      G.inventory[playerID][type]--;
      G.turnCount++;
    },
  },

  endIf: ({ G, ctx }) => {
    // Logic for surrounding the Queen would go here
  },
};
