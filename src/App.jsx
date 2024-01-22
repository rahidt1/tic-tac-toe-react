import { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { Player } from "./components/Player";
import { Log } from "./components/Log";
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
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = derivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

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
      winner = firstSymbol;
  }

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {winner && <p>You won ! {winner}</p>}
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
