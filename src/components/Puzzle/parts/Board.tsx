import React from "react";
import { useContext } from "react";
import { Chessboard } from "react-chessboard";
import { PuzzleContext } from "./Root";
import { getCustomSquareStyles, isLegalMove } from "../utils/utils";
import { Square } from "chess.js";

export interface BoardProps extends React.ComponentProps<typeof Chessboard> {}
export const Board: React.FC<BoardProps> = ({ ...rest }) => {
  const puzzleContext = useContext(PuzzleContext);
  if (!puzzleContext) {
    throw new Error("PuzzleContext not found");
  }

  const [activeSquare, setActiveSquare] = React.useState<Square | null>(null);

  const onSquareClick = (square: Square) => {
    if (["solved", "failed"].includes(status)) {
      return;
    }
    if (activeSquare === null) {
      setActiveSquare(game.moves({ square }).length ? square : null);
    } else {
      if (isLegalMove(game, `${activeSquare}${square}`)) {
        handlePieceDrop(activeSquare, square);
        setActiveSquare(null);
      } else {
        setActiveSquare(game.moves({ square }).length ? square : null);
      }
    }
  };

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
        activeSquare,
        nextMove,
        lastMove
      )}
      boardOrientation={orientation}
      position={game.fen()}
      onPieceDrop={(sourceSquare, targetSquare) =>
        handlePieceDrop(sourceSquare, targetSquare)
      }
      onSquareClick={onSquareClick}
      areArrowsAllowed={true}
      animationDuration={status === "not-started" ? 0 : 300}
      {...rest}
    />
  );
};
