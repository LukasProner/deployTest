import React, { useState, useEffect } from "react";
import styles from './Chess.module.css'

const Chess = () => {
    const initialBoard = [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["a", "a", "a", "a", "a", "a", "a", "a"],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ["A", "A", "A", "A", "A", "A", "A", "A"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ];

    const [board, setBoard] = useState(initialBoard);
    const [selected, setSelected] = useState(null);
    const [fig, setFig] = useState(null);

    useEffect(() => {
        console.log("selected changed:", selected);
    }, [selected]);

    // useEffect na sledovanie zmeny "fig"
    useEffect(() => {
        console.log("fig changed:", fig);
    }, [fig]);

    const renderPiece = (piece) => {
        const piecesMap = {
            k: "♚",
            q: "♛",
            r: "♜",
            b: "♝",
            n: "♞",
            a: "♟",
            K: "♔",
            Q: "♕",
            R: "♖",
            B: "♗",
            N: "♘",
            A: "♙",
        };
        return piece ? piece : "";
    };
    const clearBoardFromClues = (customBoard) => {
        const clearedBoard = customBoard.map(r =>
            r.map(c => {
                console.log(c);
                return c === '*' ? null : c
                
            }
        ));
        console.log("vymazane - " +clearedBoard);
        setBoard(clearedBoard);
    }

    const handleClick = (row, col) => {
        if (selected) {
            const newBoard = board.map((r) => r.slice());

            if (board[row][col] === '*') {
                newBoard[row][col] = board[selected[0]][selected[1]];
                newBoard[selected[0]][selected[1]] = null;
            }

            clearBoardFromClues(newBoard);

            setSelected(null);
            if (board[row][col]) {
                setSelected([row, col]);
                setFig(board[row][col])

                if (board[row][col] === 'a') {
                    doPawnMove(row, col, "black");
                } else if (board[row][col] === 'A') {
                    // doPawnMove(row, col, "white");
                    showValidMove('A', row, col);
                }
            }

        } else if (board[row][col]) {
            setSelected([row, col]);
            setFig(board[row][col])

            if (board[row][col] === 'a') {
                doPawnMove(row, col, "black");
            } else if (board[row][col] === 'A') {
                // doPawnMove(row, col, "white");
                showValidMove('A', row, col);
            }
        }
    };

    const doPawnMove = (row, col, color) => {
        console.log("Pawn move" + row, col, color);
        if (color === 'white') {
            showValidMove('A', row, col);
        }
    }

    const showValidMove = (figure, row, col) => {
        if (figure === 'A') {
            const newBoard = board.map(r => r.slice()); // vytvor kópiu

            if (newBoard[row - 1][col] == null) {
                newBoard[row - 1][col] = '*';
            }
            if (newBoard[row - 2][col] == null && row == 6) {
                newBoard[row - 2][col] = '*';
            }

            setBoard(newBoard);
        }
    };


    return (
        <div className={styles.board}>
            {board.flatMap((row, i) =>
                row.map((piece, j) => {
                    const isSelected = selected && selected[0] === i && selected[1] === j; // pri nacitani nemozne citat z null
                    return (
                        <div onClick={() => handleClick(i, j)} className={styles.tile} style={{ backgroundColor: isSelected ? "yellow" : (i + j) % 2 === 0 ? "#f0d9b5" : "#b58863", }}>
                            {renderPiece(piece)}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Chess;
