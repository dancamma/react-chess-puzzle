import React from "react";
import { Chessboard } from "react-chessboard";
import type { Puzzle as PuzzleType } from "../utils/puzzle";
import usePuzzle from "./usePuzzle";
import { getCustomSquareStyles } from "./utils";

export interface PuzzleProps extends React.ComponentProps<typeof Chessboard> {
  puzzle: PuzzleType;
  onSolve?: () => void;
  onFail?: () => void;
}
export const InternalPuzzle: React.FC<PuzzleProps> = ({
  puzzle: { fen, moves },
  onSolve,
  onFail,
  ...rest
}) => {
  const { game, status, lastMove, orientation, handlePieceDrop, isPlayerTurn } =
    usePuzzle(
      {
        fen,
        moves,
      },
      onSolve,
      onFail
    );

  return (
    <Chessboard
      customSquareStyles={getCustomSquareStyles(status, isPlayerTurn, lastMove)}
      boardOrientation={orientation}
      position={game.fen()}
      onPieceDrop={(sourceSquare, targetSquare) =>
        handlePieceDrop(sourceSquare, targetSquare)
      }
      {...rest}
    />
  );
};

export const Puzzle: React.FC<PuzzleProps> = (props) => {
  const { puzzle } = props;
  const key = `${puzzle.fen}-${puzzle.moves.join("-")}`;
  return <InternalPuzzle key={key} {...props} />;
};
