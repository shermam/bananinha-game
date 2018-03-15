import { checkEnd, initializeGrid } from "./gameLogic.js";

const database = firebase.database();

export function saveSala(sala) {
    database.ref('sala').set(sala);
}

export function checkSala(sala) {
    database.ref('sala').on('value', snap => {
        const snapObj = snap.val();

        if (!snapObj) {
            return;
        }

        sala.grid = snapObj.grid || sala.grid;
        sala.turn = snapObj.turn || sala.turn;
        sala.lastMove = snapObj.lastMove || sala.lastMove;

        if (checkEnd(
            sala.lastMove.x,
            sala.lastMove.y,
            sala.turn,
            sala.grid
        )) {
            setTimeout(() => {
                alert("Você Perdeu");
                sala.grid = initializeGrid();
                saveSala(sala);
            }, 500);
        }
    });
}