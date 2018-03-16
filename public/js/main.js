// const auth = firebase.auth();


// auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(function (result) {
//     console.log(result);
// });
import { initializeGrid, checkEnd, clickHandler } from "./gameLogic.js";
import { saveSala, checkSala, treatMove } from "./database.js";
import { draw, canvas } from "./redering.js";


const lobby = [];
const sala = {
    name: "Sala de: ",
    creatorId: null,
    players: [],
    grid: null,
    turn: 0,
    lastMove: null,
    numberOfPlayers: 2,
    movesToWin: 5,
    tracks: 15,
    initialValue: 'vazio'
};

(function initialize() {
    initializeGrid(sala);
    saveSala(sala);
    checkSala(sala);
    clickHandler(canvas, sala, treatMove);
    draw(sala);
})();