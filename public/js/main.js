// const auth = firebase.auth();


// auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(function (result) {
//     console.log(result);
// });
import { initializeGrid, checkEnd, clickHandler } from "./gameLogic.js";
import { saveSala, checkSala, treatMove } from "./database.js";

const turnLabel = document.querySelector('#turn-id');
const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
const sala = {
    name: "Sala de: ",
    creatorId: null,
    players: [], 
    grid: null,
    turn: 0,
    lastMove: null,
    numberOfPlayers: 3,
    movesToWin: 5,
    tracks: 15,
    initialValue: 'vazio'
};
const cellSize = canvas.width / sala.tracks;



(function initialize() {
    initializeGrid(sala);
    checkSala(sala);
    clickHandler(cellSize, canvas, sala, treatMove);
    draw();
})();

function draw() {
    drawGrid();
    updateTurnLabel();
    requestAnimationFrame(draw);
}

function updateTurnLabel() {
    turnLabel.innerHTML = `Vez de: ${sala.turn}`;
    turnLabel.style.background = getBackground((sala.turn + 1) % sala.numberOfPlayers);
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