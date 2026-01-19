import { changeBackgroundMusic, easyMusic, hardMusic, } from "../utilities";
import { StartView } from "../views/startView";
import { observer } from "mobx-react-lite";

const Start = observer(


    function StartRender(props) {


        
        function startEasyGameACB(){
            props.model.ready = false;
            changeBackgroundMusic(easyMusic)
            props.model.newQuiz(10, "easy");
            
            
            window.location.hash = "/game";
            props.model.currentView = "game";

        }

        function startHardGameACB(){
            props.model.ready = false;
            changeBackgroundMusic(hardMusic)
            props.model.newQuiz(10, "hard");
            
            
            window.location.hash = "/game";
            props.model.currentView = "game";

        }
            
            return(
                <StartView
                    newQuiz={startEasyGameACB}
                    newQuizHard={startHardGameACB}
                    ready={props.model.ready}
                    promise={props.model.importFilmsPromiseState.promise}
                    
                />

            );
    });

    
export { Start };