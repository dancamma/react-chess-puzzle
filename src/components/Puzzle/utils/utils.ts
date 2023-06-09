import { Chess, Move, Square } from "chess.js";
import { Hint, Status } from "./types";
import React, { CSSProperties, ReactElement, ReactNode } from "react";
import { Puzzle } from "../../utils/puzzle";

const FAIL_COLOR = "rgba(201, 52, 48, 0.5)";
const SUCCESS_COLOR = "rgba(172, 206, 89, 0.5)";
const HINT_COLOR = "rgba(27, 172, 166, 0.5)";
const CPU_MOVE_COLOR = "rgba(255, 255, 0, 0.5)";

export const getCustomSquareStyles = (
  status: Status,
  hint: Hint,
  isPlayerTurn: boolean,
  activeSquare: Square | null,
  nextMove?: Move | null,
  lastMove?: Move | null
) => {
  const customSquareStyles: Record<string, CSSProperties> = {};

  if (status === "failed" && lastMove) {
    customSquareStyles[lastMove.from] = {
      backgroundColor: FAIL_COLOR,
    };
    customSquareStyles[lastMove.to] = {
      backgroundColor: FAIL_COLOR,
    };
  }

  if (
    lastMove &&
    (status === "solved" || (status !== "failed" && !isPlayerTurn))
  ) {
    customSquareStyles[lastMove.from] = {
      backgroundColor: SUCCESS_COLOR,
    };
    customSquareStyles[lastMove.to] = {
      backgroundColor: SUCCESS_COLOR,
    };
  }

  if (lastMove && isPlayerTurn) {
    customSquareStyles[lastMove.from] = {
      backgroundColor: CPU_MOVE_COLOR,
    };
    customSquareStyles[lastMove.to] = {
      backgroundColor: CPU_MOVE_COLOR,
    };
  }

  if (activeSquare) {
    customSquareStyles[activeSquare] = {
      backgroundColor: CPU_MOVE_COLOR,
    };
  }

  if (hint === "piece") {
    if (nextMove) {
      customSquareStyles[nextMove.from] = {
        backgroundColor: HINT_COLOR,
      };
    }
  }

  if (hint === "move") {
    if (nextMove) {
      customSquareStyles[nextMove.from] = {
        backgroundColor: HINT_COLOR,
      };
      customSquareStyles[nextMove.to] = {
        backgroundColor: HINT_COLOR,
      };
    }
  }

  return customSquareStyles;
};

interface ClickableElement extends ReactElement {
  props: {
    onClick?: () => void;
  };
}

export const getOrientation = (puzzle: Puzzle) => {
  const fen = puzzle.fen;
  const game = new Chess(fen);
  if (puzzle.makeFirstMove) {
    game.move(puzzle.moves[0]);
  }
  return game.turn() === "w" ? "white" : "black";
};

export const isClickableElement = (
  element: ReactNode
): element is ClickableElement => React.isValidElement(element);

export const getMove = (game: Chess, move: string): Move => {
  const copy = new Chess(game.fen());
  return copy.move(move);
};

export const isLegalMove = (game: Chess, move: string) => {
  const copy = new Chess(game.fen());

  try {
    copy.move(move);
    return true;
  } catch (e) {
    return false;
  }
};
