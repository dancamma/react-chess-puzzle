import React, { useContext } from "react";
import { PuzzleContext } from "./Root";
import { isClickableElement } from "./utils";

export interface RestartProps {
  asChild?: boolean;
}

export const Restart: React.FC<React.PropsWithChildren<RestartProps>> = ({
  children,
  asChild,
}) => {
  const puzzleContext = useContext(PuzzleContext);
  if (!puzzleContext) {
    throw new Error("PuzzleContext not found");
  }

  const { restartPuzzle } = puzzleContext;
  const handleClick = () => {
    restartPuzzle();
  };

  if (asChild) {
    // add on click to the first children if it is a button
    const child = React.Children.only(children);
    if (isClickableElement(child)) {
      return React.cloneElement(child, {
        onClick: handleClick,
      });
    } else {
      throw new Error("Restart child must be a clickable element");
    }
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};
