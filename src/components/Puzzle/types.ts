import { Chess } from "chess.js";
import type { Puzzle } from "../utils/puzzle";

export type Controls = {
  reset: () => void;
  change: (puzzle: Puzzle) => void;
};

export type Status = "not-started" | "in-progress" | "solved" | "unsolved";

export interface PuzzleContext {
  puzzle: Puzzle;
  currentGame: Chess;
  status: Status;
  controls: Controls;

  moveNumber: number;
}
