const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
const tracks = 15;
const cellSize = canvas.width / tracks;
const grid = createGrid(tracks);

let turn = true;

(function initialize() {
    clickHandler();
    draw();
})();

function draw() {
    drawGrid();
    requestAnimationFrame(draw);
}


function drawGrid() {

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            context.beginPath();
            context.strokeStyle = "#000000";
            context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            if (grid[i][j] === true) {
                context.fillStyle = "#00FF00";
                context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            } else if (grid[i][j] === false) {
                context.fillStyle = "#FF0000";
                context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            }
            context.closePath();
        }
    }
}

function createGrid(tracks) {
    const grid = [];
    for (let i = 0; i < tracks; i++) {
        grid[i] = [];
        for (let j = 0; j < tracks; j++) {
            grid[i][j] = null;
        }
    }

    return grid;
}

function clickHandler() {
    canvas.onclick = function (e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const i = Math.floor(x / cellSize);
        const j = Math.floor(y / cellSize);

        if (grid[i][j] === null) {
            turn = !turn;
            grid[i][j] = turn;
        }
    }
}