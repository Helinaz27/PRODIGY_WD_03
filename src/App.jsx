import React, { useState } from "react";
import "./App.css";

function Square({ value, onClick }) {
  return (
    <button
      className="square w-16 h-16 bg-gray-200 border border-gray-400 text-2xl font-bold hover:bg-gray-300"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board({ players, onRestart }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner === "X" ? players.player1 : players.player2}`
    : `Next player: ${isXNext ? players.player1 : players.player2}`;

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    onRestart();
  };

  return (
    <div>
      <div className="status text-xl mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      {winner && (
        <button
          className="restart-button mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      )}
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    if (player1 && player2) {
      setGameStarted(true);
    }
  };

  const restartGame = () => {
    setGameStarted(false);
    setPlayer1("");
    setPlayer2("");
  };

  return (
    <div className="game flex flex-col items-center justify-center min-h-screen">
      {!gameStarted ? (
        <div className="player-inputs space-y-4">
          <div>
            <label className="block text-lg font-medium">Player 1 (X): </label>
            <input
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Player 2 (O): </label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={startGame}
            className="mt-4 p-2 bg-green-500 text-white rounded"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="game-board">
          <Board players={{ player1, player2 }} onRestart={restartGame} />
        </div>
      )}
    </div>
  );
}

export default App;
