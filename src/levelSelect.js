 import { HIDDEN_SCREEN } from '/src/Common.esm.js'
import {Common} from '/src/Common.esm.js'

 const gameLevels = [
    {
          level:1,
    },
    {
        level:2,
    },
    {
    level:3,
   },
   {
    level:4,
    },
 
 ];
const LEVEL_SELECT_BUTTON_CLASS ='level-select__button'
const LEVEL_SELECT_ID = 'level-select-screen'

 class LevelSelect extends Common {
     constructor(){
         super(LEVEL_SELECT_ID);
         gameLevels.forEach(gameLevel => this.createButton(gameLevel.level))
     }

     createButton(value){
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
        this.changeVisibiltyScreen(this.element, HIDDEN_SCREEN)
    }
     
 }

 export const levelSelect = new LevelSelect();