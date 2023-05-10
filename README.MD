# react-chess-puzzle

`react-chess-puzzle` is an open-source React library that provides a chess puzzle component, which allows users to interactively solve chess puzzles. This library leverages the `react-chessboard` package to render the chessboard. This library is inspired by the composability of Radix UI's components.
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


## Anatomy

Import all parts and piece it together:

```tsx
import { Puzzle } from 'react-chess-puzzle';

const puzzle = {
    fen: "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 1",
    moves: ["Bxd7+", "Nxd7", "Qb8+", "Nxb8", "Rd8#"],
};

const App = () => {
    return (
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
    );
};
```

## API Reference

### `Puzzle.Root`

The root component of the puzzle. It is a wrapper component that provides the context for the other components.

#### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `puzzle` | `Puzzle` | | The puzzle object containing the FEN string and moves sequence. |
| `onSolve` | `() => void` | | A callback function that is called when the puzzle is solved. |
| `onFail` | `() => void` | | A callback function that is called when the puzzle is failed. |

### `Puzzle.Board`

The chessboard component. It renders the chessboard and the pieces. It accepts all props from `react-chessboard`.


### `Puzzle.Reset`

A button that changes the puzzle. It can be used, for example, to restart the puzzle or move to the next puzzle.

#### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `puzzle` | `Puzzle` | | The puzzle object containing the FEN string and moves sequence. If not provided, the current puzzle is reset. |
| `onReset` | `() => void` | | A callback function that is called when the puzzle is reset. |
| `showOn` | `"not-started" \| "in-progress" \| "solved" \| "failed"[]` | | The state(s) in which the button is shown. |
| `asChild` | `boolean` | `false` | Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node. |

### `Puzzle.Hint`

A button that shows the next move of the puzzle.

#### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `showOn` | `"not-started" \| "in-progress" \| "solved" \| "failed"[]` | | The state(s) in which the button is shown. |
| `asChild` | `boolean` | `false` | Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node. |

#### Props

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