/* jslint esnext: true */

import { DOM } from './base';

//////////////////////////////////
// GET HEIGHT AND WIDTH FROM DOM 
//////////////////////////////////

export const getGridSize = () => {
    // Read height and width from inputs on DOM
    let height = DOM.inputHeight.value;
    let width = DOM.inputWidth.value;
    
    // If user has not entered height, or user has entered height fewer than 20 cells
    if (!height || height < 20 ) {
        if (height !== '') {
            alert('🙏 To avoid breaking this design, height can be no fewer than 20 cells'); 
        }        
        height = 20;
        DOM.inputHeight.value = 20;
        
    // If user has entered height greater than 50 cells
    } else if (height > 50) {
        height = 50;
        DOM.inputHeight.value = 50;
        alert('To avoid breaking this design, height can be no more than 50 cells. 😁');
    }
    
    // If user has not entered width, or user has entered width fewer than 20 cells
    if (!width || width < 20) {
        if (width !== '') {
            alert('👋 To avoid breaking this design, width can be no fewer than 20 cells.');    
        }
        width = 20;
        DOM.inputWidth.value = 20;
        
    // If user has entered width greater than 50 cells    
    } else if (width > 50) {
        width = 50;
        DOM.inputWidth.value = 50;
        alert('To avoid breaking this design, width can be no more than 50 cells. 🙃');
    }
    
    return [height, width];
};

//////////////////////////////////
// RENDER CELLS TO GAME BOARD 
//////////////////////////////////

export const renderBoard = (start, end) => {
    // If current grid size is smaller than desired size, add more cells
    if (start < end) {
        for (let i=start; i < end; i++) {
            let cell = document.createElement("div");
            cell.classList.add('game__cell', `game__cell--${i}`);
            DOM.grid.appendChild(cell);
        } 
    
    // If current grid size is bigger than desired size, remove cells
    } else if (start > end) {
        for (let i = start - 1; i >= end; i--) {
            const cell = document.querySelector(`.game__cell--${i}`);
            DOM.grid.removeChild(cell);
        }
    }  
};

//////////////////////////////////
// RESIZE CELLS  
//////////////////////////////////

export const resizeCells = (size) => {
    // Get all cells currently in grid 
    const cells = [...document.querySelectorAll('.game__cell')];
    
    // Resize them according to height of grid
    if (size === 'medium') {
        cells.forEach(el => {
            el.style.width = '15px';
            el.style.height = '15px';
        });        
    } else if (size === 'small') {
        cells.forEach(el => {
            el.style.width = '10px';
            el.style.height = '10px';
        });
    } else if (size === 'tiny') {
        cells.forEach(el => {
            el.style.width = '8px';
            el.style.height = '8px';
        });
    } else if (size === 'default') {
        cells.forEach(el => {
            el.style.width = '20px';
            el.style.height = '20px';    
        });
    }

};

//////////////////////////////////
// CLEAR BOARD OF LIVE CELLS
//////////////////////////////////

export const clearBoard = () => {
    // Select all live cells
    const cells = [...document.querySelectorAll('.game__cell--live')];
    
    // For each of these live cells, turn off class 'game__cell--live"
    cells.forEach(el => {
        el.classList.toggle('game__cell--live');
    });
};

//////////////////////////////////
// TURN ON LIVE CELLS
//////////////////////////////////

export const renderGame = (data) => {
    // Loop through array of game data
    for (let i=0; i < data.length; i++) {
        
        const cell = document.querySelector(`.game__cell--${i}`);
        
        // When data array indicates a cell that's supposed to be live
        if (data[i] === 1) {
            // Toggle live class on 
            cell.classList.add('game__cell--live');
        } else {
            cell.classList.remove('game__cell--live');    
        }
    }    
};
