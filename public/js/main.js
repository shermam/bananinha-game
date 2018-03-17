// const auth = firebase.auth();
// auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(function (result) {
//     console.log(result);
// });

import { createSala } from "./sala.js";
import { startGame } from "./game.js";



const mainElement = document.querySelector('#main-content');

fetch('./templates/home.html')
    .then(r => r.text())
    .then(html => mainElement.innerHTML = html)
    .then(initialize);

function initialize() {
    const createSalaButton = mainElement.querySelector('#create-sala-button');
    createSalaButton.onclick = function () {
        createSala()
            .then(sala => {
                fetch('./templates/game.html')
                    .then(r => r.text())
                    .then(html => mainElement.innerHTML = html)
                    .then(_ => startGame(sala));
            }).catch(console.log);
    }
}