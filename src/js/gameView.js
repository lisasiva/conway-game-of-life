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

export const resizeCells = (originalSize, newSize) => {
    // Get all cells currently in grid 
    const cells = [...document.querySelectorAll('.game__cell')];
    
    // Get current cell size
    const currentCellSize = cells[0].offsetWidth;
    
    // Resize them according to height of grid
    if (newSize === 'medium') {
        console.log('medium');
        cells.forEach(el => {
            el.style.width = `${originalSize * 0.75}px`;
            el.style.height = `${originalSize * 0.75}px`;
        });        
    } else if (newSize === 'small') {
        console.log('small');
        cells.forEach(el => {
            el.style.width = `${originalSize * 0.5}px`;
            el.style.height = `${originalSize * 0.5}px`;
        });
    } else if (newSize === 'tiny') {
        console.log('tiny');
        cells.forEach(el => {
            el.style.width = `${originalSize * 0.4}px`;
            el.style.height = `${originalSize * 0.4}px`;
        });originalSize
    } else if (newSize === 'default') {
        console.log('default');
        cells.forEach(el => {
            el.style.width = `${originalSize}px`;
            el.style.height = `${originalSize}px`;    
        });
    }

};


//////////////////////////////////
// RENDER GAME FROM DATA ARRAY
//////////////////////////////////

export const renderGame = (data) => {
    // Loop through array of game data
    for (let i=0; i < data.length; i++) {
        
        // Select one cell at a time
        const cell = document.querySelector(`.game__cell--${i}`);
        
        // When data array indicates a cell that's supposed to be live
        if (data[i] === 1) {
            // Toggle live class on 
            cell.classList.add('game__cell--live');
            // Else, remove live class
        } else {
            cell.classList.remove('game__cell--live');    
        }
    }    
};

//////////////////////////////////
// TOGGLE LIVE CLASS ON CELL
//////////////////////////////////

export const toggleCell = (el) => {
    el.classList.toggle('game__cell--live');
};

//////////////////////////////////
// GET ID OF CLICKED CELL
//////////////////////////////////

export const getCellID = (el) => {
    return el.className.split(' ')[1].split('--')[1];
};