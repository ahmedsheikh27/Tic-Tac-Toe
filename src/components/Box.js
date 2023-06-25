import React, { useState, useEffect } from 'react';
import './box.css';
import HashLoader
  from "react-spinners/HashLoader";
import Img from '../components/xo.png'

const Box = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('x');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async operation
    setTimeout(() => {
      setLoading(false); // Loading complete
    }, 4000);
  }, []);

  const handleClick = (index) => {
    if (winner || isDraw || board[index] !== '') {
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
    } else if (!newBoard.includes('')) {
      setIsDraw(true);
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
        className={`square ${board[index]}`}
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
    setIsDraw(false);
  };

  return (

    <>
      <div className='loader'>

        {
          loading ?
            <HashLoader
              className='loader'
              color={'red'}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            /> :

            <div className="tic-tac-toe">
              <div className='head'>
                <img src={Img} alt='' className='icon' />
                <div className="player">Current Player: {currentPlayer}</div>
              </div>
              <div className="board">
                {board.map((square, index) => (
                  <div key={index} className="square-container">
                    {renderSquare(index)}
                  </div>
                ))}
              </div>

              <footer className='foot'>Made by Muhammad Ahmed Amin❤️</footer>


            </div>
        }
        {winner ? (
          <div className='win'>
            <div className='winner'>Winner is {winner}
              <button className='reset' onClick={resetGame}>Play Again</button>
            </div>
          </div>
        ) : isDraw ? (
          <div className='win'>
            <div className="winner">It's a Draw! <button className="reset" onClick={resetGame}>
              Play Again
            </button> </div>
          </div>
        ) : <> </>}



      </div>
    </>
  );
};

export default Box;
