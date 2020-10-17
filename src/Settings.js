import { Common, HIDDEN_SCREEN } from '/src/Common.esm.js';

 const SETTING_SCREEN ='setting-screen';
 const MUSIC_ON_OFF =   'music-on-off' 
 const MUSIC_INCREASE =  'music-increase'
 const MUSIC_DEACRESE = 'music-deacrease' 
 const SOUND_ON_OFF ='sound-on-off' 
 const SOUND_INCREASE =   'sound-increase' 
 const SOUND_DECREASE = 'sound-decrease' 
 const SETTING_SCREEN_EXIT_BUTTON ='settings-screen-exit-button'


class Setting extends Common {
constructor(){
    super(SETTING_SCREEN);
    this.bindToElements();
}

bindToElements(){
    const exitSettingsElement = this.bindToElement(SETTING_SCREEN_EXIT_BUTTON);
    console.log('work')
    exitSettingsElement.addEventListener('click', ()=> {
       this.element.style.setProperty('display','none')
    });
}

}


export const settings = new Setting()