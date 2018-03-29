import * as status from "./status.js";

const templatePromise = fetch('./templates/createSalaDialog.html').then(r => r.text());

export function createSala(user) {

    return templatePromise.then(templateString => {

        const dialog = stringToElement(templateString);
        const cancelButton = dialog.querySelector('#cancel');

        //Maybe should remove from the DOM afterwards
        document.body.appendChild(dialog);

        // Form cancel button closes the dialog box
        cancelButton.addEventListener('click', function () {
            dialog.close();
        });

        return new Promise((resolve, reject) => {
            dialog.showModal();

            dialog.onclose = function () {

                if (dialog.returnValue) {

                    const form = dialog.querySelector('form');
                    const values = Array.from(form.elements).reduce((obj, element) => {
                        if (element.name) {
                            obj[element.name] = element.valueAsNumber || element.value;
                        }
                        return obj;
                    }, {});

                    resolve({
                        ...values,
                        winner: null,
                        status: status.CREATED,
                        creatorId: user.uid,
                        players: [],
                        grid: null,
                        turn: 0,
                        lastMove: null,
                        initialValue: 'vazio'
                    });
                } else {
                    reject('Cancelado pelo usuário');
                }
            }
        });
    });
}


function stringToElement(string) {
    const template = document.createElement('template');
    template.innerHTML = string;
    return template.content.firstChild;
}