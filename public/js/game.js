import { initializeGrid, checkEnd, clickHandler } from "./gameLogic.js";
import { saveSala, checkSala, treatMove } from "./database.js";
import { draw, board, initializeBoard } from "./redering.js";

const lobby = [];

export function startGame(sala) {
    initializeBoard();
    initializeGrid(sala);
    saveSala(sala);
    checkSala(sala);
    clickHandler(board, sala, treatMove);
    draw(sala);
}