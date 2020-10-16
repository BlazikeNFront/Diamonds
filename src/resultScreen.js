import { VISIBLE_SCREEN , HIDDEN_SCREEN} from '/src/Common.esm.js';
import { Common } from '/src/Common.esm.js';
import { canvas } from '/src/canvas.js';
import { mainMenu } from '/src/mainMenu.esm.js';
import { userData } from '/src/userData.js';
import { levelSelect } from '/src/levelSelect.js';
import { game } from '/src/game.js';

const RESULT_SCREEN_GAME_WIN_CLASS = 'end-screen--is-win';
const RESULT_SCREEN_END_SCREEN_ID ='end-screen';
const RESULT_SCREEN_HEADER_ID ='game-result';
const RESULT_SCREEN_USER_POINTS_ID ="js-user-points";
const RESULT_SCREEN_HIGH_SCORES_ID ="js-high-scores";
const RESULT_SCREEN_BACK_BUTTON_ID ='back-to-levels';
const RESULT_SCREEN_RESTART_LEVEL_BUTTON_ID ='restart-level' ;

class ResultScreen extends Common {
	constructor() {
		super(RESULT_SCREEN_END_SCREEN_ID);
		this.bindToElements();
	}

	bindToElements() {
		this.resultTextElement = this.bindToElement(RESULT_SCREEN_HEADER_ID);
		this.userPointsElement = this.bindToElement(RESULT_SCREEN_USER_POINTS_ID);
		this.highScoresElement = this.bindToElement(RESULT_SCREEN_HIGH_SCORES_ID);

		const backButtonElement = this.bindToElement(RESULT_SCREEN_BACK_BUTTON_ID);
		const restartButtonElement = this.bindToElement(RESULT_SCREEN_RESTART_LEVEL_BUTTON_ID);

		backButtonElement.addEventListener('click', () => this.backButtonClick());
		restartButtonElement.addEventListener('click', () => this.restartLevelClick());
	}

	viewResultScreen(isGameWin, playerPoints, level) {
		if (isGameWin) {
			this.element.classList.add(RESULT_SCREEN_GAME_WIN_CLASS);
		} else {
			this.element.classList.remove(RESULT_SCREEN_GAME_WIN_CLASS);
		}

		this.changeVisibiltyScreen(this.element, VISIBLE_SCREEN);
		this.resultTextElement.textContent = isGameWin ? 'WYGRAŁEŚ!' : 'PRZEGRAŁEŚ!';
		this.userPointsElement.textContent = String(playerPoints);
		this.highScoresElement.textContent = String(userData.getHighScore(level));

	}

	


	backButtonClick() {
		this.changeVisibiltyScreen(canvas.element, HIDDEN_SCREEN);
		this.element.style.setProperty('display', 'none');
		//this.changeVisibiltyScreen(mainMenu.miniSettingsLayerElement, HIDDEN_SCREEN);
		mainMenu.showLevelScreen();
	}

	restartLevelClick() {
		this.changeVisibiltyScreen(this.element, HIDDEN_SCREEN);
		levelSelect.loadLevel(game.gameState.level);
	}
}

export const resultScreen = new ResultScreen();