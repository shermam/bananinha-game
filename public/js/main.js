// const auth = firebase.auth();


// auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(function (result) {
//     console.log(result);
// });
import { getConfig } from "./gameConfig.js";
import { initializeGrid, checkEnd } from "./gameLogic.js";
import { saveSala, checkSala } from "./database.js";

const config = getConfig();


const turnLabel = document.querySelector('#turn-id');
const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');

const cellSize = canvas.width / config.tracks;


const sala = {
    grid: null,
    turn: 0,
    lastMove: null
};

(function initialize() {
    sala.grid = initializeGrid();
    checkSala(sala);
    clickHandler();
    draw();
})();

function draw() {
    drawGrid();
    updateTurnLabel();
    requestAnimationFrame(draw);
}

function updateTurnLabel() {
    turnLabel.innerHTML = `Vez de: ${sala.turn}`;
    turnLabel.style.background = getBackground((sala.turn + 1) % config.numberOfPlayers);
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

function drawGrid() {

    for (let i = 0; i < sala.grid.length; i++) {
        for (let j = 0; j < sala.grid[i].length; j++) {
            context.beginPath();
            context.strokeStyle = "#000000";
            if (sala.grid[i][j] !== config.initialValue) {
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


function clickHandler() {
    canvas.onclick = function (e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const i = Math.floor(x / cellSize);
        const j = Math.floor(y / cellSize);

        if (sala.grid[i][j] === config.initialValue) {
            sala.turn = (++sala.turn % config.numberOfPlayers);
            sala.grid[i][j] = sala.turn;
            sala.lastMove = { x: i, y: j };

            if (checkEnd(i, j, sala.turn, sala.grid)) {
                setTimeout(() => {
                    alert("Você Ganhou");
                    sala.grid = initializeGrid();
                    saveSala(sala);
                }, 500);
            }

            saveSala(sala);
        }
    }
}