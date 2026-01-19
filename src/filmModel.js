/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { use } from "react";
import { getRandomMovie, getCastFromID, getRandomMoviesWithCast } from "./FilmSource.js";
import { resolvePromise } from "./resolvePromise.js";

export const model = {  


    profileIcons: [
        "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/ProfilePictures/man1.png",
        "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/ProfilePictures/man2.png",
        "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/ProfilePictures/man3.png",
        "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/ProfilePictures/woman1.png",
        "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/ProfilePictures/woman2.png",
        "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/ProfilePictures/woman3.png",
    ],

    selectedProfileIcon: "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/ProfilePictures/man1.png",
    leaderboard: [],
    MusicVolume: 0.5,
    SFXVolume: 0.5,
    currentPane: null,
    currentView: "start",
    currentUser: null,
    username: "",
    password: "",
    importFilmsPromiseState: {},
    currentFilm: null, 
    filmDetails: null, 
    listOfFilms: [],
    ready: false, 

    // Game state
    showTutorial: true,
    score: 0,
    highscore: 0,
    lives: 3,
    gameOver: false,
    isAnswered: false,
    showAnswer: false,
    userGuess: "",
    lastAnswerCorrect: null,

    // Setting
    difficulty: "",
    numberOfRounds: 10,
    currentRound: 0,
    answeredFilms: [],



    setCurrentFilm(film){
        this.currentFilm = film;
        this.isAnswered = false;
        this.showAnswer = false;
        this.userGuess = "";
        this.lastAnswerCorrect = null;
    },

    newQuiz(numberOfRounds, setDifficulty){
        this.ready = false;
        this.score = 0;
        this.currentRound = 0;
        if (setDifficulty === "hard"){
            this.lives = 1;
        } else {
            this.lives = 3;
        }
        this.gameOver = false;
        this.answeredFilms = [];
        const promise = getRandomMoviesWithCast (numberOfRounds);
        resolvePromise(promise, this.importFilmsPromiseState);

        const self = this;
        
        promise.then(function(data){
            self.listOfFilms = data;
            if (self.listOfFilms.length > 0){
                self.setCurrentFilm(self.listOfFilms[0]);  // Set the first film
                self.filmDetails = self.loadMovieDetails(self.listOfFilms[0]);

            }

            self.ready = true;
        });
    },

    closeTutorial(){
        this.showTutorial = false;
    },

    nexQuestion() {
        if (this.currentRound >= this.numberOfRounds) {
             return false;
        }
        this.currentRound += 1;
        this.isAnswered = false;
        this.showAnswer = false;
        this.userGuess = "";
    
    },


    submitAnswer() {
        if (this.isAnswered || this.gameOver) return;

        const correct = this.checkAnswer(this.userGuess);

        this.lastAnswerCorrect = correct;
        this.isAnswered = true;

        if (correct) {
            this.score += 1;
        } else {
            this.lives -= 1;
        }

        console.log("Lives left:", this.lives);
        this.answeredFilms.push(this.currentFilm);

        if (this.lives <= 0) {
            this.gameOver = true;
            return;
        }

    },


    checkAnswer(guess) {

        const correctTitle = this.listOfFilms[0].primaryTitle.toLowerCase().replace(/[.,:;'··-–—]/g, "").replace(/[áàéèíìóòúù]/g, "[aaeeiioouu]").trim();
        console.log("Correct Title:", correctTitle);
  
        const userGuess = guess.toLowerCase().trim();

        if (correctTitle === this.userGuess) 
            return true;
        return userGuess === correctTitle;

    },

    goToNextFilm() {
        if (this.listOfFilms.length <= 1) return;

       
        this.listOfFilms = this.listOfFilms.slice(1);

        this.currentFilm = this.listOfFilms[0];
        this.setCurrentFilm(this.listOfFilms[0]);
        this.loadMovieDetails(this.listOfFilms[0]);
    },

    loadMovieDetails(filmInList) {
        return filmInList.primaryTitle;

    },


    printMovieList(){ // developer tool for testing

        for (let i=0; i<this.listOfFilms.length;i++){
                console.log(this.listOfFilms[i].primaryTitle)

         }
    },
    

    setLeaderboard(players){
        this.leaderboard = players;
        this.leaderboardSorter();
    },

    leaderboardSorter() {
        this.leaderboard.sort(function (a, b) {
            return b.highscore - a.highscore;
        });
    },
    

    
    setSearchQuery(text) {
    this.userGuess = text;
    },

    openPane(paneName) {
        this.currentPane = paneName;

    },
    
    closePane(){
        this.currentPane = null;

    }
    
}

  