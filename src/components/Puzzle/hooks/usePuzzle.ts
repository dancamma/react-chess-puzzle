import { useEffect, useReducer } from "react";
import { Puzzle } from "../../utils/puzzle";
import type { Square } from "chess.js";
import { initializeGame, reducer } from "./reducer";

export const usePuzzle = (
  puzzle: Puzzle,
  onSolve?: (changePuzzle: (puzzle: Puzzle) => void) => void,
  onFail?: (changePuzzle: (puzzle: Puzzle) => void) => void
) => {
  const [state, dispatch] = useReducer(reducer, puzzle, initializeGame);

  useEffect(() => {
    if (state.needCpuMove) {
      setTimeout(
        () =>
          dispatch({
            type: "CPU_MOVE",
          }),
        300
      );
    }
  }, [state.needCpuMove]);

  const changePuzzle = (puzzle: Puzzle) => {
    dispatch({ type: "INITIALIZE", payload: puzzle });
  };

  function handlePieceDrop(sourceSquare: Square, targetSquare: Square) {
    dispatch({
      type: "PLAYER_MOVE",
      payload: {
        sourceSquare,
        targetSquare,
        onSolve,
        onFail,
        changePuzzle,
      },
    });
    return true;
  }

  const onHint = () => {
    dispatch({ type: "TOGGLE_HINT" });
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
    isPlayerTurn: state.isPlayerTurn,
  };
};

export default usePuzzle;
