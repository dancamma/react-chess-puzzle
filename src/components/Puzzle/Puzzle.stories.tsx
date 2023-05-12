import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import { Puzzle } from "./index";
import { fromPgn } from "../utils/puzzle";
import { RootProps } from "./parts/Root";

const pgn = `[Event "Paris"]
[Site "Paris FRA"]
[Date "1858.??.??"]
[Round "?"]
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[Result "1-0"]
[EventDate "?"]
[FEN "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 1"]
[ECO "C41"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "33"]

15. Bxd7+
Nxd7 {And now for the memorable checkmating combination:} 16. Qb8+ $3 {[%c_effect
b8;square;b8;type;Brilliant;persistent;true]} 16... Nxb8 17. Rd8# 1-0`;

const puzzles = [
  fromPgn(pgn),
  {
    fen: "7r/2q2p1k/4rQpp/p1ppP3/Pp3P2/7R/1PP3PP/4R1K1 w - - 0 1",
    moves: ["Rxh6+", "Kxh6", "Qh8#"],
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Puzzle",
  component: Puzzle.Root,
  tags: ["components", "puzzle"],
  argTypes: {
    onSolve: { action: "onSolve" },
    onFail: { action: "onFail" },
  },
  parameters: {
    actions: { argTypesRegex: "^_on.*" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Puzzle.Root>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Example = (args: RootProps) => {
  const [puzzleIndex, setPuzzleIndex] = React.useState(0);
  const puzzle = puzzles[puzzleIndex];
  return (
    <div>
      <Puzzle.Root {...args} puzzle={puzzle}>
        <Puzzle.Board />
        <Puzzle.Reset asChild>
          <button>restart</button>
        </Puzzle.Reset>
        <Puzzle.Reset
          asChild
          puzzle={puzzles[(puzzleIndex + 1) % puzzles.length]}
          onReset={() => setPuzzleIndex((puzzleIndex + 1) % puzzles.length)}
        >
          <button>next</button>
        </Puzzle.Reset>
        <Puzzle.Hint>hint</Puzzle.Hint>
      </Puzzle.Root>
    </div>
  );
};
