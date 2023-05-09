import type { Move } from "chess.js";
import { Status } from "./usePuzzle";
import { CSSProperties } from "react";

export const getCustomSquareStyles = (
  status: Status,
  isPlayerTurn: boolean,
  lastMove?: Move
) => {
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
    (status === "solved" || (status !== "unsolved" && isPlayerTurn))
  ) {
    customSquareStyles[lastMove.from] = {
      backgroundColor: "rgba(172, 206, 89, 0.5)",
    };
    customSquareStyles[lastMove.to] = {
      position: "relative",
      backgroundColor: "rgba(172, 206, 89, 0.5)",
    };
  }

  return customSquareStyles;
};
