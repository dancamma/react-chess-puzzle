import { parse } from "@mliebelt/pgn-parser";

export interface Puzzle {
  fen: string;
  moves: string[];
}
export const fromPgn = (pgn: string): Puzzle => {
  const parsed = parse(pgn, { startRule: "game" });
  if (!parsed) {
    throw new Error("No games found in PGN");
  }
  if (
    !("tags" in parsed) ||
    !parsed?.tags ||
    !("FEN" in parsed?.tags) ||
    !("moves" in parsed)
  ) {
    throw new Error("Invalid PGN");
  }
  const moves = parsed.moves.map((move) => move.notation.notation);

  return {
    fen: parsed.tags.FEN,
    moves: moves,
  };
};
