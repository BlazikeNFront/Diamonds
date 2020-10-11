
import { Common, VISIBLE_SCREEN } from '/src/Common.esm.js';
import { gameLevels } from '/src/gameLevels.js';
import { DATALOADED_EVENT_NAME } from '/src/Loader.js';
import { canvas } from '/src/canvas.js';

export const gameState = {
    pointsToWin:7000,
    getPlayerPoints:()=> 1000,
    getLeftMovement:()=> 30,
}


class Game extends Common {
    constructor(){
        super()
    }

    playLevel(level){
        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel);
        const levelInfo = gameLevels[level-1];
        this.changeVisibiltyScreen(canvas.element, VISIBLE_SCREEN);
        this.animate();
    }


    animate(){
        canvas.drawGameOnCanvas(gameState);
        this.animationFrame = window.requestAnimationFrame(() => this.animate());

    }


}

export const game = new Game();