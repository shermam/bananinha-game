import { createSala } from "./sala.js";
import { startGame } from "./game.js";
import { login } from "./login.js";
import { renderLobby } from "./renderLobby.js";
import { saveLobby, checkLobby, checkSala } from "./database.js";

const mainElement = document.querySelector('#main-content');
const salaId = location.pathname.replace('/', '');

let user;

login()
    .then(userP => {
        user = userP;

        if (salaId) {
            return checkSala({ key: salaId })
                .then(goToGame);
        }

        return goHome();

    });


function goHome() {
    return fetch('./templates/home.html')
        .then(r => r.text())
        .then(html => mainElement.innerHTML = html)
        .then(initialize);
}

function goToGame(sala) {

    sala.players = sala.players || [];

    sala.players.push({
        name: user.displayName,
        uid: user.uid,
        img: user.photoURL
    });

    fetch('./templates/game.html')
        .then(r => r.text())
        .then(html => mainElement.innerHTML = html)
        .then(_ => startGame(sala));
}

function initialize() {
    const createSalaButton = mainElement.querySelector('#create-sala-button');
    const lobyContainer = mainElement.querySelector('#lobby');

    checkLobby(renderLobby(lobyContainer));

    createSalaButton.onclick = function () {

        createSala(user)
            .then(saveLobby)
            .then(sala => location = `./${sala.key}`)
            .catch(console.log);
    };
}