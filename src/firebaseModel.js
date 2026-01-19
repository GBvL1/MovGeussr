// initialize Firebase app
import { app, auth } from "./firebaseConfig.js";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";


const db= getFirestore(app);
window.db= db;

// make doc and setDoc available at the Console for testing
window.doc= doc        
window.setDoc= setDoc


export async function userRegistration(username, password){
    const email = `${username}@IngloriousBasterds.com`;
    // Persistance before user creation
    await setPersistence(auth, browserLocalPersistence)
    return createUserWithEmailAndPassword(auth, email, password);
}

export async function userLogIn(username, password){
    const email = `${username}@IngloriousBasterds.com`;
    await setPersistence(auth, browserLocalPersistence)
    return signInWithEmailAndPassword(auth, email, password);
}

export async function UserLogOut() {
  return signOut(auth);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export async function initializeUserData(user) {
    const userDocRef = doc(db, "users", user.uid);

    const docSnapshot = await getDoc(userDocRef);

    if (!docSnapshot.exists()) {
        await setDoc(userDocRef, {
            username: user.email.split("@")[0],
            score: 0,
            highscore: 0,
            selectedProfileIcon: "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/ProfilePictures/man1.png",
            settings: { MusicVolume: 0.5, SFXVolume: 0.5 }
        });
    }

    return (await getDoc(userDocRef)).data();
}

export async function loadUserData(user) {
    const docSnapshot = await getDoc(doc(db, "users", user.uid));
    return docSnapshot.exists() ? docSnapshot.data() : null;
}

export async function updateUserData(user, data) {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, data, { merge: true });
}

export function loadAllUsers(){
    return getDocs(collection(db, "users")).then(
        function(snapshot){
            var result = [];
            snapshot.forEach(
                function(docSnap){
                    var data = docSnap.data();
                    result.push({
                        name: data.username,
                        highscore: Number(data.highscore) || 0

                    });

                });
            return result;
        });

}

var disposePersistenceReaction = null;

function connectToPersistence(reactiveModel, reaction, user) {
    if (!user) {
        return;
    }
    


    reactiveModel.ready = false;

    var userDocRef = doc(db, "users", user.uid);

    getDoc(userDocRef)
        .then(function loadUserDataACB(docSnapshot) {
            var data = docSnapshot.data() || {};

            reactiveModel.listOfFilms = data.listOfFilms || [];
            reactiveModel.score = data.score || 0;
            reactiveModel.highscore = data.highscore || 0;
            reactiveModel.currentRound = data.currentRound || 0;
            reactiveModel.currentFilmId = data.currentFilmId || null;
            reactiveModel.isAnswered = data.isAnswered || false;
            reactiveModel.userGuess = data.userGuess || "";
            reactiveModel.selectedProfileIcon =
                data.selectedProfileIcon ||
                "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/ProfilePictures/man1.png";

            reactiveModel.MusicVolume =
                data.settings && data.settings.MusicVolume != null
                ? data.settings.MusicVolume
                : 0.5;

            reactiveModel.SFXVolume =
                data.settings && data.settings.SFXVolume != null
                ? data.settings.SFXVolume
                : 0.5;

            reactiveModel.ready = true;
        })
        .catch(function errorACB(error) {
            console.error(error);
            reactiveModel.ready = true;
        });

    disposePersistenceReaction = reaction(
        function trackModelChangesACB() {
            return [
                reactiveModel.listOfFilms,
                reactiveModel.score,
                reactiveModel.highscore,
                reactiveModel.currentRound,
                reactiveModel.currentFilmId,  
                reactiveModel.isAnswered,  
                reactiveModel.userGuess,  
                reactiveModel.selectedProfileIcon,
                reactiveModel.MusicVolume,
                reactiveModel.SFXVolume
            ];
        },

        function saveUserDataACB() {
            if (!reactiveModel.ready) {
                return;
            }

            setDoc(
                userDocRef,
                {
                    listOfFilms: reactiveModel.listOfFilms,
                    score: reactiveModel.score,
                    highscore: reactiveModel.highscore,
                    currentRound: reactiveModel.currentRound,
                    currentFilmId: reactiveModel.currentFilmId,  
                    isAnswered: reactiveModel.isAnswered,               
                    userGuess: reactiveModel.userGuess, 

                    selectedProfileIcon: reactiveModel.selectedProfileIcon,
                    settings: {
                        MusicVolume: reactiveModel.MusicVolume,
                        SFXVolume: reactiveModel.SFXVolume
                    }
                },
                { merge: true }
            );
        }
    );
}

function disconnectPersistence(){
        if (disposePersistenceReaction) {
            disposePersistenceReaction();
            disposePersistenceReaction = null;
        }
    }

export { connectToPersistence, disconnectPersistence };