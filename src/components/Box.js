import React, { useState } from 'react'
import "./box.css"
const Box = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('x');
    const [winner, setWinner] = useState(null);
  
    const handleClick = (index) => {
      if (winner || board[index] !== '') {
        return;
      }
  
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
  
      const nextPlayer = currentPlayer === 'x' ? 'o' : 'x';
      setCurrentPlayer(nextPlayer);
  
      const gameWinner = calculateWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
      }
    };
  
    const calculateWinner = (board) => {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
  
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
  
      return null;
    };
  
    const renderSquare = (index) => {
      return (
        <button
          className="square"
          onClick={() => handleClick(index)}
        >
          {board[index]}
        </button>
      );
    };
  
    const resetGame = () => {
      setBoard(Array(9).fill(''));
      setCurrentPlayer('x');
      setWinner(null);
    };
  

  return (
    <>
    <div className="tic-tac-toe">
    <h1>TicTacToe</h1>
    {winner ? (
        <div className="message">Winner is {winner}</div>
      ) : (
        <div className="message">Current Player: {currentPlayer}</div>
      )}
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    <div className="board">
        {board.map((square, index) => (
          <div key={index} className="square-container">
            {renderSquare(index)}
          </div>
        ))}
      </div>
     
             
             
      </div>
          </>
  )
}

export default Box