import "/src/teacherFetch.js"; // protection against fetch() in infinite loops
import { observable, configure, reaction } from "mobx";
import { connectToPersistence, disconnectPersistence, initializeUserData } from "./firebaseModel.js";
import { model } from "./filmModel.js";
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.js";


configure({ enforceActions: "never", });  // we don't use Mobx actions in the Lab

export const reactiveModel=observable(model);


onAuthStateChanged(auth, function authChangedACB(user) {
    if (user) {
        reactiveModel.currentUser = user;
        reactiveModel.username = user.email.split("@")[0];
        initializeUserData(user).then(function () {
            connectToPersistence(reactiveModel, reaction, user);
        });
    } else {
        reactiveModel.currentUser = null;
        reactiveModel.username = "";
        disconnectPersistence();

        reactiveModel.listOfFilms = [];
        reactiveModel.score = 0;
        reactiveModel.highscore = 0;
        reactiveModel.currentRound = 0;
        reactiveModel.selectedProfileIcon = null;
        reactiveModel.ready = true;
    }
});

reaction(
    function trackImportFilmsACB() {
        return reactiveModel.importFilmsPromiseState.data; //What to track
    },
    
    function currentFilmEffectACB(filmData) {
        if (filmData && filmData.length > 0) {
            reactiveModel.listOfFilms = filmData;
        }
    }
);

window.myModel= reactiveModel;



