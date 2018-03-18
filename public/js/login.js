export function login() {
    const auth = firebase.auth();

    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
                    .then(r => resolve(r.user))
                    .catch(reject);
            } else {
                resolve(user);
            }
        })

    });
}