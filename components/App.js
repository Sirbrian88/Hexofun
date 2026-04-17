
import { Client } from 'boardgame.io/react';
import { HiveGame } from './game';
import { HiveBoard } from './HiveBoard';

const HiveClient = Client({
  game: HiveGame,
  board: HiveBoard,
  multiplayer: false,
});

export default function App() {
  return <HiveClient />;
}
