import React, { ReactElement, ReactNode, useContext } from "react";
import { Puzzle } from "../../utils/puzzle";
import { PuzzleContext } from "./Root";
import { isClickableElement } from "../utils/utils";
import { Status } from "../utils/types";

export interface ResetProps {
  asChild?: boolean;
  puzzle?: Puzzle;
  onReset?: () => void;
  showOn?: Status[];
}

const defaultShowOn: Status[] = ["failed", "solved"];

export const Reset: React.FC<React.PropsWithChildren<ResetProps>> = ({
  children,
  asChild,
  puzzle,
  onReset,
  showOn = defaultShowOn,
}) => {
  const puzzleContext = useContext(PuzzleContext);
  if (!puzzleContext) {
    throw new Error("PuzzleContext not found");
  }
  const { changePuzzle, status } = puzzleContext;
  const handleClick = () => {
    changePuzzle(puzzle || puzzleContext.puzzle);
    onReset?.();
  };

  if (!showOn.includes(status)) {
    return null;
  }

  if (asChild) {
    const child = React.Children.only(children);
    if (isClickableElement(child)) {
      return React.cloneElement(child, {
        onClick: handleClick,
      });
    } else {
      throw new Error("Change child must be a clickable element");
    }
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};
