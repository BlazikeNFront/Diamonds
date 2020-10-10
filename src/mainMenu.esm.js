
import { Common,HIDDEN_SCREEN, VISIBLE_SCREEN } from '/src/Common.esm.js';
import {levelSelect} from '/src/levelSelect.js';


const SCALE_PROPERTY = '--scale-value'
const START_SCREEN_DATAATT ='start-screen';
const START_SCREEN_GAME_BUTTON_DATAATT ='start-game';
const START_SCREEN_SETTINGS_BUTTON_DATAATT ='settings-button';

export class MainMenu extends Common {
constructor(element){
    super();
    
    this.bindToGameElements();
    this.resizeGameWindow();
    window.addEventListener('resize',()=>{this.resizeGameWindow()});

}

bindToGameElements(){
    const gameStartButton = this.bindToElement(START_SCREEN_GAME_BUTTON_DATAATT);
    const gameSettingsButton = this.bindToElement(START_SCREEN_SETTINGS_BUTTON_DATAATT);
    
    

    gameStartButton.addEventListener(('click'), ()=> {
        this.showLevelScreen();
    })

    gameSettingsButton.addEventListener(('click'), ()=> {
        this.showSettingsScreen();
    })
}

showLevelScreen(){
const startScreen = this.bindToElement(START_SCREEN_DATAATT);
const levelSelectScreen = this.bindToElement('level-select-screen');

this.changeVisibiltyScreen(startScreen, HIDDEN_SCREEN);
this.changeVisibiltyScreen(levelSelectScreen, VISIBLE_SCREEN);
}

showSettingsScreen(){
    console.log('work setting')
}


resizeGameWindow(){
    const { innerWidth: width, innerHeight: height } = window;
    const scale = Math.min(width / 640, height / 480);

    document.documentElement.style.setProperty(SCALE_PROPERTY, scale);
}




}

