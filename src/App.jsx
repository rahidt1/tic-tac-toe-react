import { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { Player } from "./components/Player";
import { Log } from "./components/Log";
import { GameOver } from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = derivePlayer(gameTurns);

  // let gameBoard = [...initialGameBoard.map((array) => [...array])];
  let gameBoard = structuredClone(initialGameBoard);

  for (const turn of gameTurns) {
    // prettier-ignore
    const {square:{row,col},player} = turn

    gameBoard[row][col] = player;
  }

  // Check for winner
  // Check three symbols from board using different winning combination positions. If the symbols are same, we got our winner !

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    )
      winner = players[firstSymbol];
  }

  // Check for draw
  const isDraw = !winner && gameTurns.length === 9; // As we have only 9 possible combinations

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curr) => (curr === "X" ? "O" : "X"));
    setGameTurns((prevTurn) => {
      const currentPlayer = derivePlayer(prevTurn);

      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];

      return updatedTurn;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onPlayerNameChange={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onPlayerNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          turns={gameTurns}
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
