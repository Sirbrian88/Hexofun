
import React, { useState } from 'react';
import { HexGrid, Layout, Hexagon, Text, GridGenerator } from 'react-hexgrid';

export function HiveBoard({ ctx, G, moves }) {
  const [selectedPiece, setSelectedPiece] = useState(null);

  const onHexClick = (event, hexagon) => {
    const { q, r } = hexagon;
    if (selectedPiece) {
      moves.placePiece(selectedPiece, q, r);
      setSelectedPiece(null);
    }
  };

  const playerID = ctx.currentPlayer;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
      <h1>Hive - Player {playerID}'s Turn</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <h3>Your Hand:</h3>
        {Object.entries(G.inventory[playerID]).map(([type, count]) => (
          <button 
            key={type} 
            disabled={count === 0}
            onClick={() => setSelectedPiece(type)}
            style={{ 
              padding: '10px', 
              border: selectedPiece === type ? '3px solid black' : '1px solid gray',
              borderRadius: '8px',
              backgroundColor: 'white'
            }}
          >
            {type} ({count})
          </button>
        ))}
      </div>

      <HexGrid width={800} height={600} viewBox="-50 -50 100 100">
        <Layout size={{ x: 10, y: 10 }} flat={false} spacing={1.1} origin={{ x: 0, y: 0 }}>
          {/* Create a base grid to click on */}
          {GridGenerator.hexagon(5).map((hex, i) => (
            <Hexagon 
              key={i} 
              q={hex.q} 
              r={hex.r} 
              s={hex.s} 
              onClick={(e, h) => onHexClick(e, h)}
              style={{ fill: G.cells[`${hex.q},${hex.r}`] ? 'none' : '#e0e0e0', stroke: 'white' }}
            />
          ))}

          {/* Render the actual pieces */}
          {Object.entries(G.cells).map(([key, piece]) => {
            const [q, r] = key.split(',').map(Number);
            return (
              <Hexagon key={key} q={q} r={r} s={-q-r} style={{ fill: piece.player === '0' ? '#333' : '#fff', stroke: 'orange' }}>
                <Text style={{ fontSize: '3px', fill: piece.player === '0' ? 'white' : 'black' }}>{piece.type}</Text>
              </Hexagon>
            );
          })}
        </Layout>
      </HexGrid>
    </div>
  );
}
