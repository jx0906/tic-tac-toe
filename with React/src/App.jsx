import { useEffect, useState } from "react";
import "./App.css";
import Board from "./Board";

// Vanilla JS Solution Code
// https://replit.com/@jim_clark/Tic-Tac-Toe-Weekend-Solution#index.html

const initialState = {
  board: [null, null, null, null, null, null, null, null, null],
  turn: 1,
  winner: null,
  message: "Welcome!",
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(initialState.board);
  const [turn, setTurn] = useState(initialState.turn);
  const [winner, setWinner] = useState(initialState.winner);
  const [message, setMessage] = useState(initialState.message);
  // only need to make winner a calculated state if we are implementing
  // scoring --- KIV till we are done with the other features

  useEffect(() => {
    // bif things will run async then you may need to do this, ie, define checkForTie, then use
    // async+await JavaScript functions but in this case, not necessary cos useEffect doesn't run async
    // by default and not accurate cos it will end up waiting for a winner to be set even though the results
    // cld indeed be a tie (ie, no winner)
    // const checkForTie = async () => {
    //   if (!board.includes(null)) {
    //     await setWinner("tie");
    //     setMessage(`This game is a ${winner}!`);
    //   }
    // };

    for (let winArr of winningCombos) {
      if (
        Math.abs(board[winArr[0]] + board[winArr[1]] + board[winArr[2]]) === 3
      ) {
        setWinner(board[winArr[0]] === 1 ? "Purple" : "Orange");
        setMessage(`${winner} has won the game!`);
      }
    }

    if (!board.includes(null) && !winner) {
      setWinner("tie");
      setMessage(`This game is a ${winner}!`);
    }
  }, [board, winner]);

  //the original portion below runs concurrently with the top code.. but it will run faster, so in the last move, before the
  //above code executes, the portion below would alr have declared winner to be Tie:
  // const checkForTie = async () => {
  //   if (!board.includes(null)) {
  //     await setWinner("tie");
  //     setMessage("This game is a tie!");
  //   }
  // };

  function handleBoardClick(e) {
    e.preventDefault();
    const id = e.target.id;
    if (winner || id === "board" || board[id] !== null) return;
    setTurn((prev) => (prev === 1 ? -1 : 1));
    setMessage(`It's ${turn === 1 ? "Orange" : "Purple"}'s turn now`);
    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[id] = turn;
      return newBoard;
    });
  }

  function handlePlayAgain(e) {
    e.preventDefault();
    setBoard(initialState.board);
    setTurn(initialState.turn);
    setWinner(initialState.winner);
    setMessage(initialState.message);
  }

  return (
    <div className="wrapper">
      <h1>{message}</h1>
      <Board
        handleBoardClick={handleBoardClick}
        board={board}
        winner={winner}
      />
      <button onClick={handlePlayAgain}>PLAY AGAIN</button>
    </div>
  );
}

export default App;
