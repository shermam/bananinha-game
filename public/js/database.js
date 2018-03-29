import { checkEnd, initializeGrid } from "./gameLogic.js";
import * as status from "./status.js";

const database = firebase.database();

export function saveSala(sala) {
    database.ref('lobby/' + sala.key).set(sala);
}

export function saveLobby(sala) {
    return database.ref('lobby').push(sala)
        .then(r => {
            sala.key = r.key;
            return sala;
        });
}

export function checkLobby(render) {
    database.ref('lobby').on('value', snap => {
        const snapObj = snap.val();
        if (!snapObj) return;
        render(snapObj);
    });
}

export function checkSala(sala) {
    return new Promise((resolve, reject) => {
        database.ref('lobby/' + sala.key).on('value', snap => {
            const snapObj = snap.val();

            if (!snapObj) {
                return;
            }

            for (const key in snapObj) {
                sala[key] = snapObj[key];
            }

            checkStarted(sala);
            treatMove(sala);
            resolve(sala);
        });
    });
}

export function treatMove(sala) {
    if (checkEnd(
        sala
    )) {
        sala.winner = sala.players[sala.turn];
        sala.status = status.ENDED;
    }

    saveSala(sala);
}

function checkStarted(sala) {
    if (sala.status === status.CREATED &&
        sala.players &&
        sala.players.length === sala.numberOfPlayers) {
        sala.status = status.STARTED;
        saveSala(sala);
    }
}