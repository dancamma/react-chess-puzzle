import React, { ReactElement, ReactNode, useContext } from "react";
import { Puzzle } from "../../utils/puzzle";
import { PuzzleContext } from "./Root";
import { isClickableElement } from "../utils/utils";
import { Status } from "../utils/types";

export interface HintProps {
  asChild?: boolean;
  showOn?: Status[];
}

const defaultShowOn: Status[] = ["not-started", "in-progress"];

export const Hint: React.FC<React.PropsWithChildren<HintProps>> = ({
  children,
  asChild,
  showOn = defaultShowOn,
}) => {
  const puzzleContext = useContext(PuzzleContext);
  if (!puzzleContext) {
    throw new Error("PuzzleContext not found");
  }
  const { onHint, status } = puzzleContext;
  const handleClick = () => {
    onHint();
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
