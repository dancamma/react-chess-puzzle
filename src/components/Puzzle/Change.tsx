import React, { ReactElement, ReactNode, useContext } from "react";
import { Puzzle } from "../utils/puzzle";
import { PuzzleContext } from "./Root";
import { isClickableElement } from "./utils";

export interface ChangeProps {
  asChild?: boolean;
  puzzle: Puzzle;
  onChange?: () => void;
}

export const Change: React.FC<React.PropsWithChildren<ChangeProps>> = ({
  children,
  asChild,
  puzzle,
  onChange,
}) => {
  const puzzleContext = useContext(PuzzleContext);
  if (!puzzleContext) {
    throw new Error("PuzzleContext not found");
  }
  const { changePuzzle } = puzzleContext;
  const handleClick = () => {
    changePuzzle(puzzle);
    onChange?.();
  };

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
