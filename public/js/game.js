import { initializeGrid, checkEnd } from "./gameLogic.js";
import { saveSala, checkSala, treatMove } from "./database.js";
import { draw, board, initializeBoard, clickHandler } from "./redering.js";

export function startGame(sala) {
    initializeBoard();
    initializeGrid(sala);
    saveSala(sala);
    checkSala(sala);
    clickHandler(sala, treatMove);
    draw(sala);
}