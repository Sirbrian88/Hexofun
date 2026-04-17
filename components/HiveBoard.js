
import React, { useState } from 'react';

// Math for drawing a Hexagon in SVG
const hexPath = "M 8.66 5 L 0 10 L -8.66 5 L -8.66 -5 L 0 -10 L 8.66 -5 Z";

export function HiveBoard({ ctx, G, moves }) {
  const [selectedPiece, setSelectedPiece] = useState(null);

  // Generate a basic 7x7 hex grid center
  const grid = [];
  for (let q = -3; q <= 3; q++) {
    for (let r = Math.max(-3, -q - 3); r <= Math.min(3, -q + 3); r++) {
      grid.push({ q, r });
    }
  }

  const handleClick = (q, r) => {
    if (selectedPiece) {
      moves.placePiece(selectedPiece, q, r);
      setSelectedPiece(null);
    }
  };

  const playerID = ctx.currentPlayer;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Hive - Player {playerID}'s Turn</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {Object.entries(G.inventory[playerID]).map(([type, count]) => (
          <button 
            key={type} 
            disabled={count === 0}
            onClick={() => setSelectedPiece(type)}
            style={{ 
              padding: '10px', 
              border: selectedPiece === type ? '3px solid blue' : '1px solid gray',
              backgroundColor: count === 0 ? '#ddd' : 'white',
              borderRadius: '8px'
            }}
          >
            {type} ({count})
          </button>
        ))}
      </div>

      <svg width="600" height="600" viewBox="-50 -50 100 100">
        {grid.map(hex => {
          const x = 10 * (Math.sqrt(3) * hex.q + Math.sqrt(3)/2 * hex.r);
          const y = 10 * (3/2 * hex.r);
          const piece = G.cells[`${hex.q},${hex.r}`];
          
          return (
            <g key={`${hex.q},${hex.r}`} transform={`translate(${x}, ${y})`} onClick={() => handleClick(hex.q, hex.r)} style={{cursor: 'pointer'}}>
              <path d={hexPath} fill={piece ? (piece.player === '0' ? '#333' : 'white') : '#e5e7eb'} stroke="#999" strokeWidth="0.5" />
              {piece && (
                <text textAnchor="middle" dy="1.5" fontSize="2.5" fill={piece.player === '0' ? 'white' : 'black'} fontWeight="bold">
                  {piece.type.substring(0, 1)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
