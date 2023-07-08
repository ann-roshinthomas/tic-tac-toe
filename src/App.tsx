import { useState } from "react";

import "./App.css";

// List of cell indices that are 3-in-a-row.
const CELLS_IN_A_LINE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Determine if there's a winner for the board.
function determineWinner(board: any) {
  for (let i = 0; i < CELLS_IN_A_LINE.length; i++) {
    const [x, y, z] = CELLS_IN_A_LINE[i];
    // Determine if the cells in a line have the same markCell.
    if (board[x] != null && board[x] === board[y] && board[y] === board[z]) {
      return board[x];
    }
  }

  // No winner yet.
  return null;
}
type cellType = {
  disabled: boolean;
  markCell: number;
  onClick: () => void;
};
function Cell({ disabled, markCell, onClick }: cellType) {
  return (
    <button className="cell" disabled={disabled} onClick={onClick}>
      <span>{markCell}</span>
    </button>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerX, setXAsPlayer] = useState(true);

  const winner = determineWinner(board);

  function onReset() {
    setBoard(Array(9).fill(null));
    setXAsPlayer(true);
  }

  function getStatusMessage() {
    if (winner != null) {
      return `Player ${winner} wins!`;
    }

    // All cells have been filled up.
    if (!board.includes(null)) {
      return `It's a draw!`;
    }

    return `Player ${playerX ? "X" : "O"} 's turn`;
  }

  return (
    <div className="app">
      <div
        className={`status ${winner ? "winner" : ""} ${
          !board.includes(null) ? "draw" : ""
        }`}
      >
        {getStatusMessage()}
      </div>
      <div className="gameBoard">
        {Array(9)
          .fill(null)
          .map((_, cellIndex) => {
            const currentTurn = playerX ? "X" : "O";

            return (
              <Cell
                key={cellIndex}
                disabled={board[cellIndex] != null || winner != null}
                markCell={board[cellIndex]}
                onClick={() => {
                  const updatedBoard = board.slice();
                  updatedBoard[cellIndex] = currentTurn;
                  setBoard(updatedBoard);
                  setXAsPlayer(!playerX);
                }}
              />
            );
          })}
      </div>
      <button
        className="resetBtn"
        onClick={() => {
          if (winner == null) {
            // Confirm whether to reset the game.
            const confirm = window.confirm(
              "Are you sure you want to reset the game?"
            );
            if (!confirm) {
              return;
            }
          }

          onReset();
        }}
      >
        RESET
      </button>
    </div>
  );
}
