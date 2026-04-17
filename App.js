
import { Client } from 'boardgame.io/react';
import { HivePuzzle } from './game';
import { HiveBoard } from './HiveBoard';

const HiveClient = Client({
  game: HivePuzzle,
  board: HiveBoard,
  multiplayer: false,
});

export default function App() {
  return <HiveClient />;
}
