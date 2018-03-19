let images;

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

    Promise.all(sala.players.map(user => loadImage(user.img)))
        .then(_images => {
            images = _images;
            loop();
        });

    function loop() {
        drawGrid(sala, cellSize);
        updateTurnLabel(sala);
        requestAnimationFrame(loop);
    };

}

export function updateTurnLabel(sala) {
    const turn = (sala.turn + 1) % sala.numberOfPlayers;
    const player = sala.players[turn];

    if (!player) return;

    board.turnLabel.innerHTML = `Vez de: ${sala.players[turn].name}`;
    board.turnLabel.style.background = getBackground(turn);
}

export function getBackground(turn) {
    return images[turn];
}

export function drawGrid(sala, cellSize) {

    for (let i = 0; i < sala.grid.length; i++) {
        for (let j = 0; j < sala.grid[i].length; j++) {
            board.context.beginPath();
            board.context.strokeStyle = "#000000";
            if (sala.grid[i][j] !== sala.initialValue) {
                const img = getBackground(sala.grid[i][j]);
                board.context.drawImage(img, i * cellSize, j * cellSize, cellSize, cellSize)
            } else {
                board.context.fillStyle = "#FFFFFF";
                board.context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            }
            board.context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            board.context.closePath();
        }
    }
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image;
        img.onload = _ => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}