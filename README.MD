# react-chess-puzzle

`react-chess-puzzle` is an open-source React library that provides a chess puzzle component, which allows users to interactively solve chess puzzles. This library leverages the `react-chessboard` package to render the chessboard.

## Demo

You can view the demo storybook [here](https://react-chess-puzzle.vercel.app/).

## Installation

To install the library, run:

```bash
npm install react-chess-puzzle
```

or

```bash
yarn add react-chess-puzzle
```

## Usage

Here's an example of how to use the `Puzzle` component from `react-chess-puzzle`:

```jsx
import React from "react";
import { Puzzle } from "react-chess-puzzle";
import { Puzzle as PuzzleType, fromPgn } from "./utils/puzzle";

const puzzle = {
    fen: "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 1",
    moves: ["Bxd7+", "Nxd7", "Qb8+", "Nxb8", "Rd8#"],
};

const App = () => {
  return (
    <div>
      <Puzzle puzzle={myPuzzle} />
    </div>
  );
};

export default App;
```

## Props

The `Puzzle` component accepts all the props from the `Chessboard` component from `react-chessboard`, as well as the following:

| Name       | Type         | Description                                                     |
|------------|--------------|-----------------------------------------------------------------|
| `puzzle`   | `PuzzleType` | The puzzle object containing the FEN string and moves sequence. |
| `onSolve` | `() => void` | A callback function that is called when the puzzle is solved.   |
| `onFail` | `() => void` | A callback function that is called when the puzzle is failed.   |


## Utility Functions

### `fromPgn(pgn: string): Puzzle`

Creates a puzzle object from a given PGN string.

#### Parameters

- `pgn`: A PGN string representing a chess game.

#### Returns

A puzzle object containing the FEN string and moves sequence.

## Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.

To set up the project locally:

1. Clone the repository
2. Run `npm install` or `yarn` to install the dependencies
3. Start the development server with `npm start` or `yarn start`

Before submitting a pull request, please ensure the changes pass all tests and the code adheres to the project's coding style.

## License

`react-chess-puzzle` is released under the [MIT License](./LICENSE).