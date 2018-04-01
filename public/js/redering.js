import { getUser } from "./login.js";
import * as status from "./status.js";

// let images;
// if (!images) {
//     return Promise.all(sala.players.map(user => loadImage(user.img)))
//         .then(_images => {
//             images = _images;
//             requestAnimationFrame(innerLoop);
//         });
// }

let pieces;

function createPieces(numberOfPlayers) {
    return colorir(numberOfPlayers)
        .map((color, index) => {
            return makePiece(color, index % 2 === 0);
        });
}

function makePiece(color, isCircle) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const size = 400;
    const lineWidth = size / 6;
    const quarterDiagonal = ((Math.sqrt(2 * (size * size))) / 2) - lineWidth * 2.25;

    canvas.width = canvas.height = size;

    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';

    context.beginPath();

    if (isCircle) {
        context.ellipse(
            size / 2,
            size / 2,
            size / 2 - lineWidth,
            size / 2 - lineWidth,
            0,
            0,
            2 * Math.PI
        );
    } else {
        context.moveTo(size / 2 - quarterDiagonal, size / 2 - quarterDiagonal);
        context.lineTo(size / 2 + quarterDiagonal, size / 2 + quarterDiagonal);
        context.moveTo(size / 2 + quarterDiagonal, size / 2 - quarterDiagonal);
        context.lineTo(size / 2 - quarterDiagonal, size / 2 + quarterDiagonal);
    }

    context.stroke();
    context.closePath();

    return canvas;
}

function colorir(n) {
    const colors = [];
    for (var i = 0; i < n; i++) {
        var value = (3 / n) * i;
        var r = (1 - (Math.abs(value - 3) < value ? Math.abs(value - 3) : value)) * 255;
        var g = (1 - Math.abs(value - 1)) * 255;
        var b = (1 - Math.abs(value - 2)) * 255;

        colors.push([r, g, b].reduce((previous, value) => {
            return previous + Math
                .floor(value < 0 ? 0 : value)
                .toString(16)
                .padStart(2, 0)
                .toUpperCase();
        }, '#'));
    }
    return colors;
}

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
    pieces = createPieces(sala.numberOfPlayers);
    loop(sala, cellSize);
}

function loop(sala, cellSize) {

    function innerLoop() {
        if (sala.status !== status.STARTED) {
            return requestAnimationFrame(innerLoop);
        }

        drawGrid(sala, cellSize);
        updateTurnLabel(sala);
        return requestAnimationFrame(innerLoop);
    };

    innerLoop();

};

export function updateTurnLabel(sala) {
    const turn = (sala.turn + 1) % sala.numberOfPlayers;
    const player = sala.players[turn];

    if (!player) return;

    board.turnLabel.innerHTML = `Vez de: ${sala.players[turn].name}`;
    board.turnLabel.style.background = getBackground(turn);
}

export function getBackground(turn) {
    return pieces[turn];
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

export function clickHandler(sala, treatMove) {

    const cellSize = board.canvas.width / sala.tracks;

    board.canvas.onclick = function (e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const i = Math.floor(x / cellSize);
        const j = Math.floor(y / cellSize);

        getUser()
            .then(user => {
                const turn = (sala.turn + 1) % sala.numberOfPlayers;
                if (sala.status === status.STARTED &&
                    sala.grid[i][j] === sala.initialValue &&
                    sala.players[turn].uid === user.uid
                ) {
                    sala.turn = turn;
                    sala.grid[i][j] = sala.turn;
                    sala.lastMove = { x: i, y: j };

                    (treatMove || function () { })(sala);
                }
            });
    }
}