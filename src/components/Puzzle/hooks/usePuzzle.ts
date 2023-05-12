import { useReducer } from "react";
import { Puzzle } from "../../utils/puzzle";
import type { Move, Square } from "chess.js";
import { getCustomSquareStyles } from "../utils/utils";
import { initializeGame, reducer } from "./reducer";

export const usePuzzle = (
  puzzle: Puzzle,
  onSolve?: () => void,
  onFail?: () => void
) => {
  const [state, dispatch] = useReducer(reducer, puzzle, initializeGame);

  function handlePieceDrop(sourceSquare: Square, targetSquare: Square) {
    dispatch({
      type: "PLAYER_MOVE",
      payload: {
        sourceSquare,
        targetSquare,
        onSolve,
        onFail,
      },
    });

    setTimeout(
      () =>
        dispatch({
          type: "CPU_MOVE",
        }),
      250
    );

    return true;
  }

  const onHint = () => {
    dispatch({ type: "TOGGLE_HINT" });
  };

  const changePuzzle = (puzzle: Puzzle) => {
    dispatch({ type: "INITIALIZE", payload: puzzle });
  };

  return {
    game: state.game,
    orientation: state.orientation,
    status: state.status,
    lastMove: state.lastMove,
    handlePieceDrop,
    changePuzzle,
    puzzle,
    hint: state.hint,
    onHint,
    nextMove: state.nextMove,
  };
};

export default usePuzzle;
