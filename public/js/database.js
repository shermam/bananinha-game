import { checkEnd, initializeGrid } from "./gameLogic.js";

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

            resolve(sala);

        });
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