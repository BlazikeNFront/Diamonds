
import { Common, VISIBLE_SCREEN } from '/src/Common.esm.js';
import { gameLevels } from '/src/gameLevels.js';
import { DATALOADED_EVENT_NAME } from '/src/Loader.js';
import { canvas } from '/src/canvas.js';
import { Diamond } from '/src/diamonds.js';
import { media } from '/src/media.js';
import { GameState } from '/src/gameState.js';
export const GAME_BOARD_X_OFFSET = 40;
export const GAME_BOARD_Y_OFFSET = -5;


export const gameState = {
    pointsToWin:7000,
    getPlayerPoints:()=> 1000,
    getLeftMovement:()=> 30,
}


class Game extends Common {
    constructor(){
     
        super();
        

    }

    playLevel(level){
       
        const { numberOfMovements, pointsToWin, board} = gameLevels[level-1];
        



        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel);
        this.changeVisibiltyScreen(canvas.element, VISIBLE_SCREEN);

        this.gameState = new GameState(level, numberOfMovements, pointsToWin, gameLevels[level-1].board, media.diamondsSprite)
        this.diamond = new Diamond(50,50,1,1,2,media.diamondsSprite)
        this.animate();
    }


    animate(){

        canvas.drawGameOnCanvas(gameState);
        this.gameState.getGameBoard().forEach(diamond => diamond.draw());
        this.animationFrame = window.requestAnimationFrame(() => this.animate());

    }


}

export const game = new Game();