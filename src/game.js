
import { Common, VISIBLE_SCREEN } from '/src/Common.esm.js';
import { gameLevels } from '/src/gameLevels.js';
import { DATALOADED_EVENT_NAME } from '/src/Loader.js';
import { canvas } from '/src/canvas.js';
import { Diamond, DIAMOND_SIZE } from '/src/diamonds.js';
import { media } from '/src/media.js';
import { GameState } from '/src/gameState.js';
import { mouseController } from '/src/mouseController.js';
export const GAME_BOARD_X_OFFSET = 40;
export const GAME_BOARD_Y_OFFSET = -5;


const SWAPPING_SPEED = 8;
const DIAMONDS_ARRAY_WIDTH = 8;
const DIAMONDS_ARRAY_HEIGHT = DIAMONDS_ARRAY_WIDTH + 1; // with invisible first line;
const LAST_ELEMENT_DIAMONDS_ARRAY = DIAMONDS_ARRAY_WIDTH * DIAMONDS_ARRAY_HEIGHT - 1;


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
        console.log(this.gameState.getIsMoving())
    }


    animate(){
        canvas.drawGameOnCanvas(this.gameState);

       this.handleMouseState();
        this.handleMouseClick();
        this.findMatches();
        this.moveDiamonds();
        this.revertSwap();
        
        this.gameState.getGameBoard().forEach(diamond => diamond.draw());
        this.animationFrame = window.requestAnimationFrame(() => this.animate());

    }
    handleMouseState() {
		const isSwaping = !this.gameState.getIsSwaping();
		const isMoving = !this.gameState.getIsMoving();

		if (mouseController.clicked && isSwaping && isMoving) {
			mouseController.state++;
		}
	}

    handleMouseClick() {
		if (!mouseController.clicked) {
			return;
		}

		const xClicked = Math.floor((mouseController.x - GAME_BOARD_X_OFFSET) / DIAMOND_SIZE);
		const yClicked = Math.floor((mouseController.y - GAME_BOARD_Y_OFFSET) / DIAMOND_SIZE);

		if (!yClicked || xClicked >= DIAMONDS_ARRAY_WIDTH || yClicked >= DIAMONDS_ARRAY_HEIGHT) {
			mouseController.state = 0;

			return;
		}

		if (mouseController.state === 1) {
			mouseController.firstClick = {
				x: xClicked,
				y: yClicked,
			}
		} else if (mouseController.state === 2) {
			mouseController.secondClick = {
				x: xClicked,
				y: yClicked,
			}

			mouseController.state = 0;

			if (
				Math.abs(mouseController.firstClick.x - mouseController.secondClick.x) + 
				Math.abs(mouseController.firstClick.y - mouseController.secondClick.y) !==
				1
			) {
				return;
			}

			this.swapDiamonds();

			//media.playSwapSound();
			this.gameState.setIsSwaping(true);
			this.gameState.decreasePointsMovement();
			mouseController.state = 0;
		}

		mouseController.clicked = false;
    }
    
    findMatches(){
        this.gameState.getGameBoard().forEach((diamond,index,diamonds)=> {

            if(diamond.kind === EMPTY_BLOCK || index < DIAMONDS_ARRAY_WIDTH || index === LAST_ELEMENT_DIAMONDS_ARRAY){
                return;
            }

            if(
                diamonds[index-1].kind === diamond.kind
                && diamonds[index+1].kind === diamond.kind
                ){
                    if(Math.floor((index - 1) / DIAMONDS_ARRAY_WIDTH) === Math.floor(((index + 1) / DIAMONDS_ARRAY_WIDTH))){
                        for (let i = -1; i<=1;i++){
                            diamonds[index + i].match++;
                        }
                    }
                }

                if(index >= DIAMONDS_ARRAY_WIDTH
                    && index<LAST_ELEMENT_DIAMONDS_ARRAY - DIAMONDS_ARRAY_WIDTH +1
                    && diamonds[index - DIAMONDS_ARRAY_WIDTH].kind === diamond.kind
                    && diamonds[index + DIAMONDS_ARRAY_WIDTH].kind === diamond.kind){
                    if((index - DIAMONDS_ARRAY_WIDTH) % DIAMONDS_ARRAY_WIDTH ===(index + DIAMONDS_ARRAY_WIDTH)&DIAMONDS_ARRAY_WIDTH){
                        for (let i = -DIAMONDS_ARRAY_WIDTH; i <= DIAMONDS_ARRAY_WIDTH; i+= DIAMONDS_ARRAY_WIDTH){
                            diamonds[index + i].match++;
                        }
                    }
                    }
        })
    }

        swapDiamonds(){
            
            const firstDiamond = mouseController.firstClick.y * DIAMONDS_ARRAY_WIDTH + mouseController.firstClick.x;
            const secondDiamond = mouseController.secondClick.y * DIAMONDS_ARRAY_WIDTH + mouseController.secondClick.x;
            this.swap(this.gameState.getGameBoard()[firstDiamond],this.gameState.getGameBoard()[secondDiamond]);
        }

        moveDiamonds(){
            this.gameState.setIsSwaping(false);
            this.gameState.getGameBoard().forEach(diamond => {
                let dx;
                let dy;

                for(let speedSwap=0;speedSwap < SWAPPING_SPEED; speedSwap++){
                    dx = diamond.x - diamond.row * DIAMOND_SIZE;
                    dy = diamond.y - diamond.column * DIAMOND_SIZE;
                    if(dx) {
                        diamond.x  -= dx/Math.abs(dx);
                    }
                    if(dy){
                        diamond.y -= dy/Math.abs(dy);
                    }
                }

                if(dx || dy){
                    this.gameState.setIsMoving = true;
                }
            } );
        }

        revertSwap(){
            if(this.gameState.getIsSwaping() && !this.gameState.getIsMoving()){
             //   if(!this.scores){
               //     this.swapDiamonds();
                //    this.gameState.increasePlayerPointSMovement();
               // }
               this.gameState.setIsSwaping(false);
            }
        }

        
        swap(firstDiamond, secondDiamond){
            [
            firstDiamond.kind,
            firstDiamond.alpha,
            firstDiamond.match,
            firstDiamond.x,
            firstDiamond.y,
            secondDiamond.kind,
            secondDiamond.alpha,
            secondDiamond.match,
            secondDiamond.x,
            secondDiamond.y,
            ] = [
                secondDiamond.kind,
                secondDiamond.alpha,
                secondDiamond.match,
                secondDiamond.x,
                secondDiamond.y,
                firstDiamond.kind,
                firstDiamond.alpha,
                firstDiamond.match,
                firstDiamond.x,
                firstDiamond.y,
            ];
           


            this.gameState.setIsMoving = true;
        }

}
export const game = new Game();