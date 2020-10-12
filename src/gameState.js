import { Diamond } from '/src/diamonds.js';


export class GameState {
    constructor(level, leftMovement, pointsToWin, diamonds, diamondsSpriteImage){
        let _leftMovement = leftMovement;
        let _playerScore = 0;
        let _gameBoard = diamonds.map(({x,y,row,column,kind}) => new Diamond(x,y,row,column,kind, diamondsSpriteImage));
        
        this._pointsToWin = pointsToWin;
        this._level = level;
        this.getLeftMovement = () => _leftMovement;
        this.decreasePointsMovement = () => _leftMovement--;
        this.increasePointsMovement = () => _leftMovement++;
        this.getPlayerPoints = () =>  _playerScore;
        this.increasePlayerPoints = points => _playerScore+=points;

        this.isPlayerWinner = () => _playerScore >= this._pointsToWin;
        this.getGameBoard =  () => _gameBoard;
    }

    get pointsToWin(){
        return this._pointsToWin;
    }

    
    get level(){
        return this._level;
    }









}