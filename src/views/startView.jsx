import React from "react";
import { SuspenseView } from "./suspenseView.jsx";
import "/src/style.css"


export function StartView(props) {

  const [showDifficulty, setShowDifficulty] = React.useState(false);


  if (!props.ready){
            return <SuspenseView promise = {props.promise} />;
        }

  function startGameEasyACB(){
    props.newQuiz();
  }

  function startGameHardACB(){
    props.newQuizHard();
  }

  function selectDifficultyACB(){
    setShowDifficulty(true);
  }

    return (
      <div className="startContainer">
      <img
        src="https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/iprog%20startview%20video%2030fps-Animated%20Image%20(Large).gif"
        className="startBackground"
        alt=""
      />
      <div className="overlay" />

        <img
            src="https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/Logos/Final%20logo%20MovGuessr.png"
            alt="MovGuessr Logo"
            className="startViewLogoStatic"
          />
      
      <div className="startGrid">
          
          <p className="startViewText">
            A game by BvL DriZzy, Huey, Alex Turner & Dsvdv
          </p>

        <div className="startActions">
          {!showDifficulty && (
            <button onClick={selectDifficultyACB} className="playButton">
              PLAY
            </button>
          )}

          {showDifficulty && (
            <div className="difficultyButtonGroup">
              <p className="selectDifficultyText">Select difficulty:</p>
              <button onClick={startGameEasyACB} className="difficultyButton">
                Easy
              </button>
              <button onClick={startGameHardACB} className="difficultyButton">
                Hard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}