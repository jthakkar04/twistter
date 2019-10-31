import app from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCFlUyTWuhN0t-e2vFq4VOtz-pu2e9Nsf4",
    authDomain: "twistter-34846.firebaseapp.com",
    databaseURL: "https://twistter-34846.firebaseio.com",
    projectId: "twistter-34846",
    storageBucket: "",
    messagingSenderId: "558905302953",
    appId: "1:558905302953:web:e6bb5284e0a8798487eeb8"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;