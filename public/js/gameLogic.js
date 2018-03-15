import { getConfig } from "./gameConfig.js";

const config = getConfig();

export function checkEnd(x, y, turn, grid) {

    //check col
    let count = 0;
    let i;
    for (i = 0; i < grid[x].length; i++) {
        if (grid[x][i] === turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === config.movesToWin) {
            return true;
        }
    }

    //check row
    count = 0;
    for (i = 0; i < grid.length; i++) {
        if (grid[i][y] === turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === config.movesToWin) {
            return true;
        }
    }


    //check diagonal
    count = 0;
    for (i = 0 - x; i < config.tracks - x; i++) {
        let x1 = (x + i) % config.tracks;
        let y1 = (y + i) % config.tracks;

        if ((x1 < x && y1 > y) || (x1 > x && y1 < y)) {
            continue;
        }

        if (grid[x1][y1] === turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === config.movesToWin) {
            return true;
        }
    }

    //check counter diagonal
    count = 0;
    for (i = 0 - x; i < config.tracks - x; i++) {
        let x1 = (x + i) % config.tracks;
        let y1 = (y - i) % config.tracks;

        if ((x1 < x && y1 < y) || (x1 > x && y1 > y)) {
            continue;
        }

        if (grid[x1][y1] === turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === config.movesToWin) {
            return true;
        }
    }
}

export function initializeGrid() {
    const grid = [];

    for (let i = 0; i < config.tracks; i++) {
        grid[i] = [];
        for (let j = 0; j < config.tracks; j++) {
            grid[i][j] = config.initialValue;
        }
    }
    return grid;
}