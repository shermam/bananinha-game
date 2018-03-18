export function login() {
    const auth = firebase.auth();
    return auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
}