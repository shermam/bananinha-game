import { createSala } from "./sala.js";
import { startGame } from "./game.js";
import { login } from "./login.js";
import { renderLobby } from "./renderLobby.js";

const mainElement = document.querySelector('#main-content');
const lobby = [];
let user;

login()
    .then(resposta => {
        user = resposta.user;
        return fetch('./templates/home.html')
    })
    .then(r => r.text())
    .then(html => mainElement.innerHTML = html)
    .then(initialize);

function initialize() {
    const createSalaButton = mainElement.querySelector('#create-sala-button');
    const lobyContainer = mainElement.querySelector('#lobby');

    createSalaButton.onclick = function () {
        createSala(user)
            .then(sala => {

                lobby.push(sala);
                renderLobby(lobyContainer, lobby);

                // fetch('./templates/game.html')
                //     .then(r => r.text())
                //     .then(html => mainElement.innerHTML = html)
                //     .then(_ => startGame(sala));
            }).catch(console.log);
    }
}