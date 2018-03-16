// const auth = firebase.auth();


// auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(function (result) {
//     console.log(result);
// });
import { initializeGrid, checkEnd, clickHandler } from "./gameLogic.js";
import { saveSala, checkSala, treatMove } from "./database.js";
import { draw, canvas } from "./redering.js";
import { createSala } from "./sala.js";


const lobby = [];

(function initialize() {
    createSala()
        .then(sala => {
            initializeGrid(sala);
            saveSala(sala);
            checkSala(sala);
            clickHandler(canvas, sala, treatMove);
            draw(sala);
        }).catch(console.log);
})();