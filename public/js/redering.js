export const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
const turnLabel = document.querySelector('#turn-id');


export function draw(sala) {
    const cellSize = canvas.width / sala.tracks;

    (function loop() {
        drawGrid(sala, cellSize);
        updateTurnLabel(sala);
        requestAnimationFrame(loop);
    })();

}

export function updateTurnLabel(sala) {
    turnLabel.innerHTML = `Vez de: ${sala.turn}`;
    turnLabel.style.background = getBackground((sala.turn + 1) % sala.numberOfPlayers);
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
            context.beginPath();
            context.strokeStyle = "#000000";
            if (sala.grid[i][j] !== sala.initialValue) {
                context.fillStyle = getBackground(sala.grid[i][j]);
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