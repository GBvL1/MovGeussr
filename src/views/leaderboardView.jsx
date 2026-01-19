import React from "react";
import "/src/style.css"

export function LeaderboardView(props) {

    function Pane({children}){
        return (
            <div className="pane">
                {children}

            </div>

        );

    }

    function turnOffLeaderboardACB(){
        props.onClosePane();

    }

    function andyModeACB(){
        props.onAndyMode();

    }

    function Board(props){
        var players = props.players || [] 
        
        if(!players || players.length === 0){
            return null;
    }
        function playerList(){
            var list = [];
            for (var i = 0; i < players.length; i++) {
                var player = players[i];
                list.push(
                    <p key={i}>
                        {i + 1}. {player.name} {player.highscore} points 
                    </p>
            
                );

            }   
            return list;
        }

        return(
            <div className="leaderboardText">
                {playerList()}

                <button
                className="logInOutButton"
                onClick={andyModeACB}
                >
                Andy Mode
            </button>
            </div>
        );

    }
    
    return(
        <div className="paneLayering">
            <Pane>
                <h2 className="paneTitle">Leaderboard</h2>
                <button                 
                    onClick={turnOffLeaderboardACB}
                    className="closeButton">
                    X
                </button>

                <Board players={props.players}/>


            </Pane>



        </div>
    );



}