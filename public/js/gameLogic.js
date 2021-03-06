import * as status from "./status.js";

export function checkEnd(sala) {
    if (!sala.lastMove) {
        return;
    }
    let x = sala.lastMove.x;
    let y = sala.lastMove.y;

    //check col
    let count = 0;
    let i;
    for (i = 0; i < sala.grid[x].length; i++) {
        if (sala.grid[x][i] === sala.turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === sala.movesToWin) {
            return true;
        }
    }

    //check row
    count = 0;
    for (i = 0; i < sala.grid.length; i++) {
        if (sala.grid[i][y] === sala.turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === sala.movesToWin) {
            return true;
        }
    }


    //check diagonal
    count = 0;
    for (i = 0 - x; i < sala.tracks - x; i++) {
        let x1 = (x + i) % sala.tracks;
        let y1 = (y + i) % sala.tracks;

        if ((x1 < x && y1 > y) || (x1 > x && y1 < y)) {
            continue;
        }

        if (sala.grid[x1][y1] === sala.turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === sala.movesToWin) {
            return true;
        }
    }

    //check counter diagonal
    count = 0;
    for (i = 0 - x; i < sala.tracks - x; i++) {
        let x1 = (x + i) % sala.tracks;
        let y1 = (y - i) % sala.tracks;

        if ((x1 < x && y1 < y) || (x1 > x && y1 > y)) {
            continue;
        }

        if (sala.grid[x1][y1] === sala.turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === sala.movesToWin) {
            return true;
        }
    }
}

export function initializeGrid(sala) {
    if (sala.status === status.ENDED) return;

    sala.grid = [];

    for (let i = 0; i < sala.tracks; i++) {
        sala.grid[i] = [];
        for (let j = 0; j < sala.tracks; j++) {
            sala.grid[i][j] = sala.initialValue;
        }
    }
    return sala.grid;
}