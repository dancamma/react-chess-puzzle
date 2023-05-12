import { CSSProperties, useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Puzzle } from "../utils/puzzle";
import type { Move, Square } from "chess.js";
import { Status, Hint } from "./types";

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
  const [nextMove, setNextMove] = useState<Move>(() => getMove(game, moves[0]));

  const [hint, setHint] = useState<Hint>("none");

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
      if (moves.length > currentMoveIndex + 1) {
        setNextMove(getMove(game, moves[currentMoveIndex + 1]));
      }
    });

    setCurrentMoveIndex(currentMoveIndex + 1);
  };

  function handlePieceDrop(sourceSquare: Square, targetSquare: Square) {
    setHint("none");
    if (["solved", "failed"].includes(status)) {
      return false;
    }
    const gameCopy = new Chess(game.fen());

    let move: Move | null = null;

    try {
      move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
    } catch (e) {
      console.log("Invalid move", e);
    }

    if (!move) {
      return false;
    }

    setLastMove(gameCopy.history({ verbose: true }).pop());

    setGame(gameCopy);

    if (move === null) return false;

    const lastGameCopyMove = gameCopy.history({ verbose: true }).pop();
    if (lastGameCopyMove?.san !== getMove(game, moves[currentMoveIndex]).san) {
      setStatus("failed");
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

  const onHint = () => {
    if (["solved", "failed"].includes(status)) {
      return;
    }

    if (hint === "none") {
      setHint("piece");
    } else if (hint === "piece") {
      setHint("move");
    }
  };

  const customSquareStyles: Record<string, CSSProperties> = {};
  if (status === "failed" && lastMove) {
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
    (status === "solved" || (status !== "failed" && currentMoveIndex % 2 === 1))
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
    const game = new Chess(puzzle.fen);
    setGame(game);
    setCurrentMoveIndex(0);
    setStatus("not-started");
    setLastMove(undefined);
    setNextMove(getMove(game, puzzle.moves[0]));
  };

  return {
    game,
    orientation,
    status,
    lastMove,
    handlePieceDrop,
    isPlayerTurn,
    changePuzzle,
    puzzle,
    hint,
    onHint,
    nextMove,
  };
};

export default usePuzzle;
