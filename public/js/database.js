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

        //Juntar com a função do treat move
        //Mas tem que ver quem ganhou e quem perdeu
        //e se o último movimento foi feito pelo jogador logado
        //para bloquear o movimento até que seja a vez dele de novo
        if (checkEnd(
            sala
        )) {
            setTimeout(() => {
                alert("Você Perdeu");
                initializeGrid(sala);
                saveSala(sala);
            }, 500);
        }
    });
}

export function treatMove(sala) {
    if (checkEnd(
        sala
    )) {
        setTimeout(() => {
            alert("Você Ganhou");
            initializeGrid(sala);
            saveSala(sala);
        }, 500);
    }

    saveSala(sala);
}