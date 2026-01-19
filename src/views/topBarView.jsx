import React from "react";
import "/src/style.css"


export function TopBarView(props) {
 
    function switchToSettingsACB(){
        props.onSettingsClick();
    }
    
    function switchToLeaderboardACB(){
        props.onLeaderboardClick();
    }
    
    function switchToAccountACB(){
        props.onAccountClick();
    }

    function switchToStartACB(){
        props.onExitClick();
    }

    function AccountButton(){
        return(
            <img
                className= "accountButton" 
                src="https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/Logos/AccountLogo.png"
                alt=""
                onClick={switchToAccountACB}
            />    
        )
    }

    function SettingsButton(){
        return(
                <img 
                className= "settingsButton"
                src="https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/Logos/SettingsLogo.png" 
                alt=""
                onClick={switchToSettingsACB}
                />
        )
    }
    function ExitButton(){
        return(
                <img 
                className= "accountButton"
                src="https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/Logos/ExitLogo.png" 
                alt=""
                onClick={switchToStartACB}
                />
        )
    }

    function LeaderboardButton(){
        return(
                <img
                className= "leaderboardButton" 
                src="https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/Logos/LeaderboardLogo.png"
                alt=""
                onClick={switchToLeaderboardACB}
                />
        )
    }

    const isGameView = props.currentView === "game";
    const isStartView = props.currentView === "start";

    return (
        <div>
            {isStartView && (
            
            <AccountButton/>
            
            )}
            {isGameView && (
            
            <ExitButton/>

            )}

            <SettingsButton/>
            <LeaderboardButton/>

        </div>
    );

}
