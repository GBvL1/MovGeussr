import { GameView } from "../views/gameView";
import { SuspenseView } from "../views/suspenseView";
import { observer } from "mobx-react-lite";
import {stopMusic, playOpen} from "../utilities";
 

const Game = observer(

    function QuestionRender(props){


        function inputChangeACB(text) {
            props.model.setSearchQuery(text);
        }
        
        function getFilmData(){
            return props.model.getCurrentFilmData();
        }

        function nextQuestionACB(){
            props.model.goToNextFilm();
        }

        function gameOverACB(){

            if (props.model.score > props.model.highscore) {
                props.model.highscore = props.model.score;
            }
            playOpen();
            window.location.hash = "/start"
            props.model.currentView = "start";
            stopMusic();

        }
        
        function onSubmitAnswerACB(){
            playOpen();
            props.model.submitAnswer();

        }

        function showTutorialACB(){
            return props.model.showTutorial;
        }
        
        function onCloseTutorialACB(){
            playOpen();
            props.model.closeTutorial();
        }

        const promiseState = props.model.importFilmsPromiseState;

        if (!promiseState || !promiseState.data) {
            return (
                <SuspenseView
                    promise={promiseState && promiseState.promise}
                    error={promiseState && promiseState.error}
                
                />
            );
        }

        return (
            <GameView
            text = {props.model.userGuess}
            score = {props.model.score}
            isAnswered = {props.model.isAnswered}
            isCorrect={props.model.lastAnswerCorrect}
            filmData = {props.model.listOfFilms}
            lives={props.model.lives}
            gameOver={props.model.gameOver}
            onShowTutorial = {showTutorialACB}
            onCloseTutorial={onCloseTutorialACB}
            clickStart = {getFilmData}
            onInputChange = {inputChangeACB}
            submitAnswer = {onSubmitAnswerACB}
            nextQuestion = {nextQuestionACB}
            onGameOver = {gameOverACB}
            />
        )
    }
)

export { Game };