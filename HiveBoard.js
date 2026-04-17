
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const hexPath = "M 8.66 5 L 0 10 L -8.66 5 L -8.66 -5 L 0 -10 L 8.66 -5 Z";

export function HiveBoard({ G, moves }) {
  const [selectedHex, setSelectedHex] = useState(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!G.isVictory) {
      const interval = setInterval(() => setSeconds(s => s + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [G.isVictory]);

  useEffect(() => {
    if (G.isVictory) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [G.isVictory]);

  const grid = [];
  for (let q = -3; q <= 3; q++) {
    for (let r = Math.max(-3, -q - 3); r <= Math.min(3, -q + 3); r++) {
      grid.push({ q, r });
    }
  }

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fffbeb', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px' }}>
        <h2 style={{ color: '#92400e' }}>Hive Puzzle</h2>
        <h2 style={{ color: '#b45309' }}>Time: {formatTime(seconds)}</h2>
      </div>

      {G.isVictory && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', zIndex: 100, textAlign: 'center', border: '4px solid #f59e0b' }}>
          <h1 style={{ fontSize: '3rem', margin: '0' }}>🐝 VICTORY! 🐝</h1>
          <p style={{ fontSize: '1.2rem' }}>The Hive is harmonized in {formatTime(G.finalTime || seconds)}!</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', fontSize: '1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Play Again</button>
        </div>
      )}

      <svg width="500" height="500" viewBox="-50 -50 100 100" style={{ margin: '20px 0' }}>
        {grid.map(hex => {
          const x = 10 * (Math.sqrt(3) * hex.q + Math.sqrt(3)/2 * hex.r);
          const y = 10 * (3/2 * hex.r);
          const key = `${hex.q},${hex.r}`;
          const cell = G.cells[key];
          const isSelected = selectedHex === key;
          
          return (
            <g key={key} transform={`translate(${x}, ${y})`} onClick={() => setSelectedHex(key)} style={{cursor: 'pointer'}}>
              <path d={hexPath} fill={isSelected ? '#fef3c7' : (cell ? '#fbbf24' : '#fff')} stroke="#d97706" strokeWidth={isSelected ? "1" : "0.3"} />
              {cell && (
                <text textAnchor="middle" dy="1.5" fontSize="5" fill="#451a03" fontWeight="bold">{cell.value}</text>
              )}
            </g>
          );
        })}
      </svg>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[1, 2, 3, 4, 5, 6, 7].map(n => (
          <button key={n} onClick={() => { if(selectedHex) moves.setNumber(...selectedHex.split(','), n) }} style={{ width: '45px', height: '45px', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '50%', border: '2px solid #d97706', backgroundColor: 'white', cursor: 'pointer' }}>
            {n}
          </button>
        ))}
        <button onClick={() => moves.triggerVictory()} style={{ marginLeft: '20px', padding: '0 15px', borderRadius: '8px', border: 'none', backgroundColor: '#059669', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Check Solve</button>
      </div>
    </div>
  );
}
