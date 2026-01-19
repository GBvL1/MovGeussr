import { observer } from "mobx-react-lite";
import { TopBarView } from "../views/topBarView";
import { playOpen, stopMusic } from "../utilities";
import { loadAllUsers } from "../firebaseModel";


const TopBar = observer(

    
    function StartRender(props) {

        function switchToLeaderboardACB(){
            playOpen();
            loadAllUsers().then(
                function(players){
                    props.model.setLeaderboard(players);
            });
            props.model.openPane("leaderboard");

        }

        function switchToAccountACB(){
            playOpen();
            props.model.openPane("account");

        }

        function switchToSettingsACB(){
            playOpen();
            props.model.openPane("settings");

        }

        function switchtoStartACB(){
            window.location.hash = "/start";
            props.model.currentView = "start";
            stopMusic();
            


        }
        
        return(
            <TopBarView
            onLeaderboardClick={switchToLeaderboardACB}
            onAccountClick={switchToAccountACB}
            onSettingsClick={switchToSettingsACB}
            onExitClick={switchtoStartACB}
            currentView={props.model.currentView}

            
            />

        );
    });

export { TopBar };
 