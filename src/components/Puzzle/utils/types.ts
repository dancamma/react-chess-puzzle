import { Chess } from "chess.js";
import type { Puzzle } from "../../utils/puzzle";

export type Controls = {
  reset: () => void;
  change: (puzzle: Puzzle) => void;
};

export type Status = "not-started" | "in-progress" | "solved" | "failed";

export type Hint = "none" | "piece" | "move";
export interface PuzzleContext {
  puzzle: Puzzle;
  currentGame: Chess;
  status: Status;
  controls: Controls;

  moveNumber: number;
}
