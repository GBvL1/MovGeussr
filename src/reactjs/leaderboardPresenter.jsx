import { observer } from "mobx-react-lite";
import { LeaderboardView } from "../views/leaderboardView";
import { changeBackgroundMusic, playClose, AndyMusic } from "../utilities";



const Leaderboard = observer(

    function StartRender(props) {

        function turnOffLeaderboardACB(){
            playClose();
            props.model.closePane();

        }

        function activateAndyModeACB(){
            changeBackgroundMusic(AndyMusic)

        }
        
        return(
            <LeaderboardView 
            players={props.model.leaderboard}
            onClosePane={turnOffLeaderboardACB}
            onAndyMode={activateAndyModeACB}
            
            />

        );
    });

export { Leaderboard };
