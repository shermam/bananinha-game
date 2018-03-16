const dialog = document.getElementById('create-sala-dialog');
const cancelButton = document.getElementById('cancel');

// Form cancel button closes the dialog box
cancelButton.addEventListener('click', function () {
    dialog.close();
});

export function createSala() {

    return new Promise((resolve, reject) => {
        var a = dialog.showModal();

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
                    creatorId: null,
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
}