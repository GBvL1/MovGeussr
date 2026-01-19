import "/src/style.css"


function EffectSlider(props){


    function switchSFXACB(event){
    props.onSFXChange(event.target.value);
}
    return(
        <div className="sliderGroup">
            <h2 className="sliderLabel">Effect Volume</h2>
            <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={props.EffectVolume}
                onChange={switchSFXACB}
                className="volumeSlider"    
            ></input>

        </div>
    )

}


function MusicSlider(props){

    function switchMusicACB(event){
    props.onMusicChange(event.target.value);
    }


    return(
        <div className="sliderGroup">
            <h2 className="sliderLabel">Music Volume</h2>
            <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={props.MusicVolume}
                onChange={switchMusicACB}
                className="volumeSlider"                 
            ></input>

        </div>
    )

}


function Pane({children}){
    return (
        <div className="pane">
            {children}

        </div>

    );

}




export function SettingsView(props) {

    function turnOffSettingsACB(){
        props.onClosePane();


    }
    
    return(
        <div className="paneLayering">
            <Pane>
                <button 
                onClick={turnOffSettingsACB}
                className="closeButton" >
                X
                </button>

                <h2 className="paneTitle">Settings</h2>
                <MusicSlider
                    MusicVolume = {props.MusicVolume}
                    onMusicChange={props.onMusicChange}
                
                />
                <EffectSlider
                    EffectVolume={props.EffectVolume}
                    onSFXChange={props.onSFXChange}
                
                />

            </Pane>

        </div>
    );



}