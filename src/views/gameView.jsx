import React from "react";
import "/src/style.css"
import { observer } from "mobx-react-lite";
import { getCastFromJob } from "/src/utilities.js"





function BackGroundImage({src}){
            return(
                <div className="gameBackground-container">
                    <img
                        src={src}
                        className="gameBackground"
                    />
                    <div className="overlay"></div>
                </div>        
            )
        }


function TutorialPopup({ onCloseTutorial }) {
  return (
    <div className="tutorialOverlay">
      <div className="tutorialBox">
        <h2 className="scoreText">Welcome to MovGuessr!</h2>
        <p className="tutorialText">
          Guess the movie title based on one of the lead actors, the director, the release date, and a blurred version of the movie poster.
          <br /><br />
          Each wrong answer costs a life.
          <br /><br />
          When you run out of lives, it's hasta la vista baby.
        </p>
        <button className="tutorialButton" onClick={onCloseTutorial}>Got it!</button>
      </div>
    </div>
  );
}



function ActorHint(props){

    const currentFilm = props.listOfFilms[0];
    
    const actorName = currentFilm.cast && currentFilm.cast[0]
        ? currentFilm.cast[0].fullName 
        : "Unknown Actor";


    const actorImg = currentFilm.cast && currentFilm.cast[0]
        ? currentFilm.cast[0].primaryImage
        : "Unknown Actor";


    
    return(
        <div className="guessingImageContainer">
            <img 
                src={actorImg} 
                alt="Main Actor of Movie"
                className="guessingImage"
            />
            <h2 
                className="GuessingImageText">
                Starring {actorName}
            </h2>
        </div>
    )
}

function DirectorHint(props){

    const currentFilm = props.listOfFilms[0];

    

    const directorName = currentFilm.cast
        ? getCastFromJob(currentFilm.cast).fullName
        : "Unknown Actor";

    const actorImg = currentFilm.cast 
        ? getCastFromJob(currentFilm.cast).primaryImage
        : "Unknown Actor";



    return(
        <div className="guessingImageContainer">
            <img 
                src={actorImg} 
                alt="Director of Movie"
                className="guessingImage"
            />
            <h2 
                className="GuessingImageText">
                Directed by {directorName}
            </h2>
        </div>
    )

}

function PosterHint(props) {

const currentFilm = props.listOfFilms[0];




const posterImg = currentFilm && currentFilm
? currentFilm.primaryImage
: "Unknown Actor";

    
return (
    <div className="guessingImageContainer">
        <div className="blurWrapper">
            <img
                src={posterImg}
                alt="Movie Poster"
                className="blurImage"
            />
        </div>
        <h2 className="GuessingImageText">Blurred poster</h2>
    </div>
);
}


function ReleaseYearHint(props){

    const year = props.listOfFilms[0].startYear;

    return(
            <h2 
                className="releaseYearText">
                Release Year: {year}
            </h2>
    )

}

function Pane({children}){
    return (
        <div className="gamePane">
            {children}

        </div>

    );

}



export const GameView = observer(
    
    function GameView(props){

        const isCorrect = props.isAnswered && props.isCorrect === true;
        const isIncorrect = props.isAnswered && props.isCorrect === false;
        const filmTitle = props.filmData[0].primaryTitle;
        
        function inputChangeACB(event){
            props.onInputChange(event.target.value);
        }

        function submitAnswerACB(){
            props.submitAnswer();
        }

        function handleEnterPressACB(event){
            if (event.key === 'Enter') {
                submitAnswerACB();
            }
        }

        function nextQuestionACB(){
            props.nextQuestion();
        }

        function gameOverACB(){
            props.onGameOver();
            
        }


    
        return (
            <div className="gameViewContainer">
                <BackGroundImage
                    src={props.filmData[0].primaryImage}
                />
                
                {props.onShowTutorial() &&
                    <TutorialPopup
                        onCloseTutorial={props.onCloseTutorial}
                    />
                }


                <Pane>
                    <h2
                        className={`
                            paneTitle
                            ${isCorrect ? "correctText" : ""}
                            ${isIncorrect ? "incorrectText" : ""}
                        `}
                    >
                        {isCorrect && "Correct!"}
                        {props.lives == 0 && "GAME OVER! Correct answer: " + filmTitle + "."}
                        {isIncorrect && props.lives > 0 && "Incorrect! The correct answer was " + filmTitle + "."}
                        {!props.isAnswered && "Guess the movie!"}
                    </h2>


                    <p className="scoreText">
                    {props.lives == 0
                    ? `Score: ${props.score}. Saving to leaderboard...`
                    : `Score: ${props.score} | Lives left: ${props.lives}`}
                    </p>
                    <div className="gameHintsContainer">
                        <ActorHint
                            listOfFilms = {props.filmData}
                        />
                        <PosterHint
                            className="imageblur"
                            listOfFilms = {props.filmData}
                        />
                        <DirectorHint
                            listOfFilms = {props.filmData}
                        />
                    </div>
                    <div>
                        <ReleaseYearHint
                            listOfFilms = {props.filmData}
                        />
                    </div>
                    <div className="buttonSegment">
                        <input
                            type="text" 
                            className={`textInput ${isCorrect ? "correctInput": ""} ${isIncorrect ? "incorrectInput" : ""}`}
                            placeholder="Your guess..."
                            onChange={inputChangeACB}
                            id ="gameInput"
                            value={props.text || ""}
                            onKeyPress={handleEnterPressACB}
                        />
                        <button
                            onClick= {
                            props.lives === 0
                                ? gameOverACB
                                : props.isAnswered
                                ? nextQuestionACB
                                : submitAnswerACB
                            }

                            className={`
                                gameSubmitButton
                                ${isCorrect ? "correctButton" : ""}
                                ${isIncorrect ? "incorrectButton" : ""}
                            `}
                        >
                            {
                                props.lives === 0
                                    ? "Exit game"
                                    : props.isAnswered
                                    ? "Next"
                                    : "Submit"
                            }
                        </button>

                    </div>
                </Pane>
            </div>
        )
    }
);