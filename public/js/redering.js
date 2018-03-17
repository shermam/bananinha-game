export const board = {
    canvas: null,
    context: null,
    turnLabel: null
};

export function initializeBoard() {
    board.canvas = document.querySelector("canvas");
    board.context = board.canvas.getContext('2d');
    board.turnLabel = document.querySelector('#turn-id');
}

export function draw(sala) {

    const cellSize = board.canvas.width / sala.tracks;

    (function loop() {
        drawGrid(sala, cellSize);
        updateTurnLabel(sala);
        requestAnimationFrame(loop);
    })();

}

export function updateTurnLabel(sala) {
    board.turnLabel.innerHTML = `Vez de: ${sala.turn}`;
    board.turnLabel.style.background = getBackground((sala.turn + 1) % sala.numberOfPlayers);
}

export function getBackground(turn) {
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

export function drawGrid(sala, cellSize) {

    for (let i = 0; i < sala.grid.length; i++) {
        for (let j = 0; j < sala.grid[i].length; j++) {
            board.context.beginPath();
            board.context.strokeStyle = "#000000";
            if (sala.grid[i][j] !== sala.initialValue) {
                board.context.fillStyle = getBackground(sala.grid[i][j]);
                board.context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            } else {
                board.context.fillStyle = "#FFFFFF";
                board.context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            }
            board.context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            board.context.closePath();
        }
    }
}