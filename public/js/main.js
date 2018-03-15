const database = firebase.database();

const turnLabel = document.querySelector('#turn-id');
const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
const tracks = 15;
const cellSize = canvas.width / tracks;
const movesToWin = 5;
const initialValue = 'vazio';
const numberOfPlayers = 3;

let grid = null;
let turn = 0;

(function initialize() {
    grid = initializeGrid();
    checkGridValue();
    clickHandler();
    draw();
})();

function draw() {
    drawGrid();
    updateTurnLabel();
    requestAnimationFrame(draw);
}

function updateTurnLabel() {
    turnLabel.innerHTML = `Vez de: ${turn}`;
    turnLabel.style.background = getBackground((turn + 1) % numberOfPlayers);
}

function getBackground(turn) {
    switch (turn) {
        case 0:
            return "#FF0000"
            break;
        case 1:
            return "#00FF00"
            break;
        case 2:
            return "#0000FF"
            break;
    }
}

function saveGrid(grid, turn, move) {
    database.ref('grid').set(grid)
        .then(console.log)
        .catch(console.log);

    database.ref('turn').set(turn)
        .then(console.log)
        .catch(console.log);

    database.ref('move').set(move)
        .then(console.log)
        .catch(console.log);
}

function checkGridValue() {
    database.ref('grid').on('value', snap => {
        grid = snap.val();
    });

    database.ref('turn').on('value', snap => {
        turn = snap.val();
    });

    database.ref('move').on('value', snap => {
        const move = snap.val();
        if (checkEnd(move.x, move.y, turn, grid)) {
            setTimeout(() => {
                alert("Você Perdeu");
                grid = initializeGrid();
            }, 500);
        }
    });
}


function drawGrid() {

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            context.beginPath();
            context.strokeStyle = "#000000";
            if (grid[i][j] !== initialValue) {
                context.fillStyle = getBackground(grid[i][j]);
                context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            } else {
                context.fillStyle = "#FFFFFF";
                context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            }
            context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            context.closePath();
        }
    }
}

function initializeGrid() {
    const grid = [];

    for (let i = 0; i < tracks; i++) {
        grid[i] = [];
        for (let j = 0; j < tracks; j++) {
            grid[i][j] = initialValue;
        }
    }
    saveGrid(grid, turn, {});
    return grid;
}

function clickHandler() {
    canvas.onclick = function (e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const i = Math.floor(x / cellSize);
        const j = Math.floor(y / cellSize);

        if (grid[i][j] === initialValue) {
            turn = (++turn % numberOfPlayers);
            grid[i][j] = turn;
            if (checkEnd(i, j, turn, grid)) {
                setTimeout(() => {
                    alert("Você Ganhou");
                    grid = initializeGrid();
                }, 500);
            }

            saveGrid(grid, turn, { x: i, y: j });
        }
    }
}


function checkEnd(x, y, turn, grid) {

    //check col
    let count = 0;
    let i;
    for (i = 0; i < grid[x].length; i++) {
        if (grid[x][i] === turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === movesToWin) {
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

        if (count === movesToWin) {
            return true;
        }
    }


    //check diagonal
    count = 0;
    for (i = 0 - x; i < tracks - x; i++) {
        let x1 = (x + i) % tracks;
        let y1 = (y + i) % tracks;

        if ((x1 < x && y1 > y) || (x1 > x && y1 < y)) {
            continue;
        }

        if (grid[x1][y1] === turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === movesToWin) {
            return true;
        }
    }

    //check counter diagonal
    count = 0;
    for (i = 0 - x; i < tracks - x; i++) {
        let x1 = (x + i) % tracks;
        let y1 = (y - i) % tracks;

        if ((x1 < x && y1 < y) || (x1 > x && y1 > y)) {
            continue;
        }

        if (grid[x1][y1] === turn) {
            count++;
        } else {
            count = 0;
        }

        if (count === movesToWin) {
            return true;
        }
    }
}