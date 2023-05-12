import React from "react";
import { Puzzle } from "../../utils/puzzle";
import usePuzzle from "../hooks/usePuzzle";

export interface RootProps {
  puzzle: Puzzle;
  onSolve?: (changePuzzle: (puzzle: Puzzle) => void) => void;
  onFail?: (changePuzzle: (puzzle: Puzzle) => void) => void;
}

export const PuzzleContext = React.createContext<ReturnType<
  typeof usePuzzle
> | null>(null);

export const Root: React.FC<React.PropsWithChildren<RootProps>> = ({
  puzzle,
  onSolve,
  onFail,
  children,
}) => {
  const context = usePuzzle(puzzle, onSolve, onFail);
  return (
    <PuzzleContext.Provider value={context}>{children}</PuzzleContext.Provider>
  );
};
