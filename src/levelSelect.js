import { VISIBLE_SCREEN } from '/src/Common.esm.js';
import { HIDDEN_SCREEN } from '/src/Common.esm.js';
import {Common} from '/src/Common.esm.js';
import {canvas} from '/src/canvas.js';
import { DATALOADED_EVENT_NAME } from '/src/Loader.js';
import { loader } from '/src/Loader.js';
import { game } from '/src/game.js';
import { media } from '/src/media.js';
import { gameLevels } from '/src/gameLevels.js';
import { userData } from '/src/userData.js';

const LEVEL_SELECT_BUTTON_CLASS ='level-select__button'
const LEVEL_SELECT_ID = 'level-select-screen'

 class LevelSelect extends Common {
     constructor(){
         super(LEVEL_SELECT_ID);
     }

     createButtons() {
		while(this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}

		gameLevels.some(gameLevel => this.createButton(gameLevel.level));
	}

     createButton(value){
        if(!userData.checkAvailabilityLevel(value)){

            
            return true
        }

         const button = document.createElement('button');

         button.type = 'button';
         button.classList.add(LEVEL_SELECT_BUTTON_CLASS);
         button.textContent = value;
         button.value = value;
         button.addEventListener('click',(e)=> {
            this.buttonOnClcikHandler(e);
         })
         this.element.appendChild(button);

         
     }

     buttonOnClcikHandler(event){
        this.changeVisibiltyScreen(this.element, HIDDEN_SCREEN);
        this.changeVisibiltyScreen(canvas.element, VISIBLE_SCREEN);
        this.loadLevel(event.currentTarget.value);
    }

    loadLevel(level){
        media.diamondsSprite = loader.loadImage('images/diamonds-transparent.png');
        media.backgroundImage = loader.loadImage('images/levelbackground.png');
        

        window.addEventListener(DATALOADED_EVENT_NAME,()=> game.playLevel(level));
    }
     
 }

 export const levelSelect = new LevelSelect();