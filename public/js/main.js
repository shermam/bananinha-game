import { createSala } from "./sala.js";
import { startGame } from "./game.js";
import { login } from "./login.js";
import { renderLobby } from "./renderLobby.js";
import { saveLobby, checkLobby } from "./database.js";

const mainElement = document.querySelector('#main-content');

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

    checkLobby(renderLobby(lobyContainer));

    createSalaButton.onclick = function () {
        createSala(user)
            .then(sala => {

                //lobby.push(sala);
                //renderLobby(lobyContainer, lobby);
                saveLobby(sala);


                // fetch('./templates/game.html')
                //     .then(r => r.text())
                //     .then(html => mainElement.innerHTML = html)
                //     .then(_ => startGame(sala));
            }).catch(console.log);
    }
}