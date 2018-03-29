import { createSala } from "./sala.js";
import { startGame } from "./game.js";
import { getUser } from "./login.js";
import { renderLobby } from "./renderLobby.js";
import { saveLobby, checkLobby, checkSala } from "./database.js";

const mainElement = document.querySelector('#main-content');
const salaId = location.pathname.replace('/', '');

getUser()
    .then(_ => {
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

    getUser()
        .then(user => {
            return addPlayer(sala, user);
        })
        .then(_ => fetch('./templates/game.html'))
        .then(r => r.text())
        .then(html => mainElement.innerHTML = html)
        .then(_ => startGame(sala));
}

function addPlayer(sala, user) {
    sala.players = sala.players || [];

    if (sala.players.find(p => p.uid === user.uid)) {
        return;
    }

    if (sala.players.length === sala.numberOfPlayers) {
        return alert('Você não poderá jogar pois a sala já está cheia!');
    }


    sala.players.push({
        name: user.displayName,
        uid: user.uid,
        img: user.photoURL
    });
}

function initialize() {
    const createSalaButton = mainElement.querySelector('#create-sala-button');
    const lobyContainer = mainElement.querySelector('#lobby');

    checkLobby(renderLobby(lobyContainer));

    createSalaButton.onclick = function () {

        getUser()
            .then(createSala)
            .then(saveLobby)
            .then(sala => location = `./${sala.key}`)
            .catch(console.log);
    };
}