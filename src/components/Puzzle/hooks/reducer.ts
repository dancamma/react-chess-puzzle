import { Chess, Move, Square } from "chess.js";
import { Puzzle } from "../../utils/puzzle";
import { Hint, Status } from "../utils/types";
import { getMove, getOrientation } from "../utils/utils";

export type State = {
  puzzle: Puzzle;
  currentMoveIndex: number;
  game: Chess;
  orientation: "white" | "black";
  status: Status;
  lastMove?: Move | null;
  nextMove?: Move | null;
  hint: Hint;
  needCpuMove: boolean;
  isPlayerTurn: boolean;
};

export type Action =
  | { type: "INITIALIZE"; payload: Puzzle }
  | { type: "RESET" }
  | { type: "TOGGLE_HINT" }
  | { type: "CPU_MOVE" }
  | {
      type: "PLAYER_MOVE";
      payload: {
        sourceSquare: Square;
        targetSquare: Square;
        onSolve?: () => void;
        onFail?: () => void;
      };
    };

export const initializeGame = (puzzle: Puzzle): State => {
  const game = new Chess(puzzle.fen);

  return {
    puzzle,
    currentMoveIndex: 0,
    game,
    orientation: getOrientation(puzzle),
    status: "not-started",
    lastMove: game.history({ verbose: true })[game.history().length - 1],
    nextMove: getMove(game, puzzle.moves[0]),
    hint: "none",
    needCpuMove: puzzle.makeFirstMove ?? false,
    isPlayerTurn: !puzzle.makeFirstMove ?? true,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        ...initializeGame(action.payload),
      };
    case "RESET":
      return {
        ...state,
        ...initializeGame(state.puzzle),
      };
    case "TOGGLE_HINT":
      if (state.hint === "none") {
        return { ...state, hint: "piece" };
      }
      return { ...state, hint: "move" };
    case "CPU_MOVE":
      if (["solved", "failed"].includes(state.status)) {
        return state;
      }
      const gameWithCpuMove = new Chess(state.game.fen());
      if (state.nextMove) {
        gameWithCpuMove.move(state.nextMove);
      }
      return {
        ...state,
        game: gameWithCpuMove,
        currentMoveIndex: state.currentMoveIndex + 1,
        lastMove: gameWithCpuMove.history({ verbose: true })[
          gameWithCpuMove.history().length - 1
        ],
        nextMove:
          state.currentMoveIndex < state.puzzle.moves.length - 1
            ? getMove(
                gameWithCpuMove,
                state.puzzle.moves[state.currentMoveIndex + 1]
              )
            : null,
        needCpuMove: false,
        isPlayerTurn: true,
      };

    case "PLAYER_MOVE":
      const { sourceSquare, targetSquare, onSolve, onFail } = action.payload;

      if (["solved", "failed"].includes(state.status)) {
        return state;
      }

      let gameWithMove = new Chess(state.game.fen());
      let move: Move | null = null;
      try {
        move = gameWithMove.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });
      } catch (error) {
        return state;
      }

      let gameWithRightMove = new Chess(state.game.fen());
      if (state.nextMove) {
        gameWithRightMove.move(state.nextMove);
      }

      const isMoveRight = gameWithRightMove.fen() === gameWithMove.fen();
      const isPuzzleSolved =
        state.currentMoveIndex === state.puzzle.moves.length - 1;

      if (!isMoveRight) {
        if (onFail) {
          onFail();
        }
        return {
          ...state,
          game: gameWithMove,
          status: "failed",
          lastMove: move,
          nextMove: null,
          hint: "none",
          isPlayerTurn: false,
        };
      }

      if (isPuzzleSolved) {
        if (onSolve) {
          onSolve();
        }

        return {
          ...state,
          game: gameWithMove,
          status: "solved",
          lastMove: move,
          nextMove: null,
          hint: "none",
          isPlayerTurn: false,
        };
      }

      return {
        ...state,
        hint: "none",
        game: gameWithMove,
        currentMoveIndex: state.currentMoveIndex + 1,
        lastMove: gameWithMove.history({ verbose: true })[
          gameWithMove.history().length - 1
        ],
        nextMove: getMove(
          gameWithMove,
          state.puzzle.moves[state.currentMoveIndex + 1]
        ),
        status: "in-progress",
        needCpuMove: true,
        isPlayerTurn: false,
      };

    default:
      return state;
  }
};
