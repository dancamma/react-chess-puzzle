import type { Move } from "chess.js";
import { Hint, Status } from "./types";
import React, { CSSProperties, ReactElement, ReactNode } from "react";

const FAIL_COLOR = "rgba(201, 52, 48, 0.5)";
const SUCCESS_COLOR = "rgba(172, 206, 89, 0.5)";
const HINT_COLOR = "rgba(27, 172, 166, 0.5)";

export const getCustomSquareStyles = (
  status: Status,
  hint: Hint,
  isPlayerTurn: boolean,
  nextMove?: Move,
  lastMove?: Move
) => {
  const customSquareStyles: Record<string, CSSProperties> = {};

  if (status === "failed" && lastMove) {
    customSquareStyles[lastMove.from] = {
      backgroundColor: FAIL_COLOR,
    };
    customSquareStyles[lastMove.to] = {
      position: "relative",
      backgroundColor: FAIL_COLOR,
    };
  }

  if (
    lastMove &&
    (status === "solved" || (status !== "failed" && isPlayerTurn))
  ) {
    customSquareStyles[lastMove.from] = {
      backgroundColor: SUCCESS_COLOR,
    };
    customSquareStyles[lastMove.to] = {
      position: "relative",
      backgroundColor: SUCCESS_COLOR,
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
        position: "relative",
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

export const isClickableElement = (
  element: ReactNode
): element is ClickableElement => React.isValidElement(element);
