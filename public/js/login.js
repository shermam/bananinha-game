const auth = firebase.auth();
let user;

export function getUser() {

    return new Promise((resolve, reject) => {

        if (user) {
            resolve(user);
        }

        auth.onAuthStateChanged(response => {
            if (!response) {
                auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
                    .then(r => resolve(r.user))
                    .catch(reject);
            } else {
                user = response;
                resolve(user);
            }
        })

    });
}