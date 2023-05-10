import { CSSProperties, useState } from "react";
import { Chess } from "chess.js";
import { Puzzle } from "../utils/puzzle";
import type { Move, Square } from "chess.js";

export type Status = "not-started" | "in-progress" | "solved" | "unsolved";

const getMove = (game: Chess, move: string): Move => {
  const copy = new Chess(game.fen());
  return copy.move(move);
};

export const usePuzzle = (
  puzzle: Puzzle,
  onSolve?: () => void,
  onFail?: () => void
) => {
  const { fen, moves } = puzzle;
  const [game, setGame] = useState(new Chess(fen));
  const [orientation] = useState<"white" | "black">(
    game.turn() === "w" ? "white" : "black"
  );
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [status, setStatus] = useState<Status>("not-started");
  const [lastMove, setLastMove] = useState<Move>();

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  }

  const makeNextMove = (game: Chess, currentMoveIndex: number) => {
    if (game.isGameOver() || game.isDraw() || moves.length <= currentMoveIndex)
      return;

    safeGameMutate((game) => {
      game.move(moves[currentMoveIndex]);
    });

    setCurrentMoveIndex(currentMoveIndex + 1);
  };

  function handlePieceDrop(sourceSquare: Square, targetSquare: Square) {
    if (["solved", "unsolved"].includes(status)) {
      return false;
    }
    const gameCopy = new Chess(game.fen());

    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    setLastMove(gameCopy.history({ verbose: true }).pop());

    setGame(gameCopy);

    if (move === null) return false;

    const lastGameCopyMove = gameCopy.history({ verbose: true }).pop();
    if (lastGameCopyMove?.san !== getMove(game, moves[currentMoveIndex]).san) {
      setStatus("unsolved");
      onFail && onFail();
    } else {
      if (currentMoveIndex + 1 === moves.length) {
        setStatus("solved");
        onSolve && onSolve();
      } else {
        setStatus("in-progress");
        setCurrentMoveIndex(currentMoveIndex + 1);
        setTimeout(() => makeNextMove(gameCopy, currentMoveIndex + 1), 250);
      }
    }

    return true;
  }

  const customSquareStyles: Record<string, CSSProperties> = {};
  if (status === "unsolved" && lastMove) {
    customSquareStyles[lastMove.from] = {
      backgroundColor: "rgba(201, 52, 48, 0.5)",
    };
    customSquareStyles[lastMove.to] = {
      position: "relative",
      backgroundColor: "rgba(201, 52, 48, 0.5)",
    };
  }

  if (
    lastMove &&
    (status === "solved" ||
      (status !== "unsolved" && currentMoveIndex % 2 === 1))
  ) {
    customSquareStyles[lastMove.from] = {
      backgroundColor: "rgba(172, 206, 89, 0.5)",
    };
    customSquareStyles[lastMove.to] = {
      position: "relative",
      backgroundColor: "rgba(172, 206, 89, 0.5)",
    };
  }

  const isPlayerTurn = currentMoveIndex % 2 === 1;

  const changePuzzle = (puzzle: Puzzle) => {
    setGame(new Chess(puzzle.fen));
    setCurrentMoveIndex(0);
    setStatus("not-started");
  };

  const restartPuzzle = () => {
    changePuzzle(puzzle);
  };

  return {
    game,
    orientation,
    status,
    lastMove,
    handlePieceDrop,
    isPlayerTurn,
    changePuzzle,
    restartPuzzle,
  };
};

export default usePuzzle;
