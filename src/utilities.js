const buttonOpen = new Audio("https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/Sound/ui-button-click-5-327756.mp3");
const buttonClose = new Audio ("https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/Sound/plopp-84863.mp3");
let backgroundMusic = new Audio ();
export const easyMusic = "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/Sound/STAR%20WARS%20SAMBA%20-%20Masayoshi%20Takanaka.mp3";
export const hardMusic = "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/Sound/Verdi%20-%20Requiem%20II.%20Dies%20Irae.mp3"
export const AndyMusic = "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/Sound/SpotiDownloader.com%20-%20Annie%20-%20Dijon.mp3";

buttonOpen.volume = 0.5;
buttonClose.volume = 0.5;
backgroundMusic.volume = 0.5;
backgroundMusic.loop = true;

export function changeBackgroundMusic(src){
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic.src = src;
    backgroundMusic.play();
}


export function getCastFromJob(castArray){
    
    function findDirectorCB(castMember){
        return castMember.job === "director"
    }
    return castArray.find(findDirectorCB);
}

export function playOpen(){
    buttonOpen.currentTime = 0;
    buttonOpen.play();
}

export function playClose(){
    buttonClose.currentTime = 0;
    buttonClose.play();
}

export function stopMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

export function setMusicVolume(value){
    backgroundMusic.volume = value;
}

export function setSFXVolume(value) {
    buttonClose.volume = value;
    buttonOpen.volume = value;
}