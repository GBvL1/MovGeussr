import { observer } from "mobx-react-lite";
import { SettingsView } from "../views/settingsView";
import { setMusicVolume, setSFXVolume } from "../utilities";
import { playClose } from "../utilities";


const Settings = observer(

    function StartRender(props) {

        function changeSFXVolume(value){
            props.model.SFXVolume = value;
            setSFXVolume(value);

        }

        function changeMusicVolume(value){
            props.model.MusicVolume = value;
            setMusicVolume(value);
        }
        
        function turnOffSettingsACB(){
            playClose();    
            props.model.closePane();

        }

        return(
            <SettingsView
            EffectVolume={props.model.SFXVolume}
            MusicVolume={props.model.MusicVolume}
            onClosePane={turnOffSettingsACB}
            onSFXChange={changeSFXVolume}
            onMusicChange={changeMusicVolume}

            />

        );
    });

export { Settings };
