/*jslint esnext: true*/

// Elements from DOM
import { DOM } from './base';

// Class to store and get game data
import Game from './game';

// Helper functions to get user input and render to DOM
import * as gameView from './gameView';

const state = {
    // Instance of Game class
        // data array
    // Current height of board
    // Current width of board
};

//////////////////////////////////
// INITIALIZE GAME
//////////////////////////////////

const init = (() => {
    // Render 20 x 20 game board
    gameView.renderBoard(0, 400);
    
    // Instantiate Game class 
    state.game = new Game(20, 20);
    
    gameView.renderGame(state.game.data);
    
    // Initialize height and width to 20
    //[state.height, state.width] = gameView.getGridSize();    
})();


//////////////////////////////////
// WHEN USER PRESSES PLAY 
//////////////////////////////////

DOM.btnPlay.addEventListener('click', () => {
    // Remove class 'game__cell--live' from live cells 
    //gameView.clearBoard();
    
    if (state.interval !== undefined) {
        clearInterval(state.interval);
        state.interval = undefined;
    } else {
        state.interval = setInterval(() => {
            // Get new game data  
            state.game.getData(true);

            // Turn on live cells
            gameView.renderGame(state.game.data);

        }, 200);
    }
    
});

//////////////////////////////////
// WHEN USER PRESSES ITERATE
//////////////////////////////////

DOM.btnIterate.addEventListener('click', () => {
    // If the user has not pressed play yet, alert
    if (state.game.data.length === 0) {
        alert('Please press play before iterating!');
    } else {
        // Get new game data
        state.game.getData(true, state.height, state.width);
        
        // Turn on live cells
        gameView.renderGame(state.game.data);    
    }
});

//////////////////////////////////
// WHEN USER RESIZES GRID
//////////////////////////////////

DOM.btnResize.addEventListener('click', () => {
    // Turn off any currently live cells
    gameView.clearBoard();
    
    // Get current number of cells
    const oldCellCount = state.height * state.width;
     
    // Get new height and width from input
    [state.height, state.width] = gameView.getGridSize();
    
    // Reset CSS property grid-template-columns
    DOM.grid.style.gridTemplateColumns = `repeat(${state.width}, auto)`;
    
    // Render the board
    let newCellCount = state.height * state.width;
    gameView.renderBoard(oldCellCount, newCellCount);
    
    // Resize cells if grid is more than 20 cells high
    if (state.height > 20 && state.height < 30) {
        gameView.resizeCells('medium');
    } else if (state.height >= 30 && state.height < 40) {
        gameView.resizeCells('small');
    } else if (state.height >= 40) {
        gameView.resizeCells('tiny');
    } else if (state.height = 20) {
        gameView.resizeCells('default');
    }
    
    // Get game data 
    state.game.getData(false, state.height, state.width);
    
    // Turn on live cells
    gameView.renderGame(state.game.data);
});