import React from "react";
import { useContext } from "react";
import { Chessboard } from "react-chessboard";
import { PuzzleContext } from "./Root";
import { getCustomSquareStyles } from "../utils/utils";

export interface BoardProps extends React.ComponentProps<typeof Chessboard> {}
export const Board: React.FC<BoardProps> = ({ ...rest }) => {
  const puzzleContext = useContext(PuzzleContext);
  if (!puzzleContext) {
    throw new Error("PuzzleContext not found");
  }

  const {
    game,
    status,
    lastMove,
    nextMove,
    orientation,
    handlePieceDrop,
    hint,
    isPlayerTurn,
  } = puzzleContext;

  return (
    <Chessboard
      customSquareStyles={getCustomSquareStyles(
        status,
        hint,
        isPlayerTurn,
        nextMove,
        lastMove
      )}
      boardOrientation={orientation}
      position={game.fen()}
      onPieceDrop={(sourceSquare, targetSquare) =>
        handlePieceDrop(sourceSquare, targetSquare)
      }
      animationDuration={status === "not-started" ? 0 : 300}
      {...rest}
    />
  );
};
