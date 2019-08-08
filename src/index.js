import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const winningCombinations =
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

function Square(props) {

    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            actualPlayer: 'X',
            gameOver: false,
            didPlay: false,
            winner: 'X'
        };

    }

    //-- Play
    handleClick(i) {
        const newSquares = this.play(i);
        if (this.state.didPlay) {
            this.checkForWinner(newSquares);
            this.changePlayer();
            this.setState({squares: newSquares});
        }
    }

    play(i) {
        this.state.didPlay = false;
        if (this.validPlayer(i)) {
            const squares = this.state.squares.slice();
            squares[i] = this.state.actualPlayer;
            this.state.didPlay = true;
            return squares;
        }
    }

    validPlayer(i) {
        return (this.state.squares[i] !== 'X' && this.state.squares[i] !== 'O');
    }

    changePlayer() {
        this.state.actualPlayer = (this.state.actualPlayer === 'X') ? 'O' : 'X';
    }

    checkForWinner(newSquares) {
        for (let i = 0; i < winningCombinations.length; ++i) {
            if (this.presentWinningCombination(winningCombinations[i], newSquares)) {
                this.state.gameOver = true;
                this.state.winner = newSquares[winningCombinations[i][0]];
                return;
            }
        }
    }

    presentWinningCombination(winningCombination, squares) {
        const isWinner = squares[winningCombination[0]] === squares[winningCombination[1]] &&  squares[winningCombination[1]] === squares[winningCombination[2]];
        const isWinnerNotNull = (squares[winningCombination[0]] !== null);
        return isWinner && isWinnerNotNull;
    }

    //---


    renderSquare(i) {
        return (<Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />);
    }

    messageToDisplay() {
        let status;
        if (this.state.gameOver) {
            status = 'Winner is : ' + this.state.winner;
        } else {
            status = 'Next player: ' + this.state.actualPlayer;
        }
        return status;
    }

    render() {
        const status = this.messageToDisplay();
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
