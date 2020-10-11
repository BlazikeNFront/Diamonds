export const HIDDEN_CLASS = 'hidden';
export const HIDDEN_SCREEN = false;
export const VISIBLE_SCREEN = true;




export class Common {
    constructor(element){
        if(typeof element === 'undefined'){return}
        this.element = this.bindToElement(element)
   
    }

    bindToElement(elementToFindByDataAttribute){
       return  document.querySelector(`[data-link='${elementToFindByDataAttribute}']`)

        
    }

    changeVisibiltyScreen(element,mode){
        
        mode === VISIBLE_SCREEN
            ? element.classList.remove(HIDDEN_CLASS):element.classList.add(HIDDEN_CLASS);
           
    }



}