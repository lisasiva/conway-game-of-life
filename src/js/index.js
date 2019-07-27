/*jslint esnext: true*/

import CellularAutomata from 'cellular-automata';


//////////////////////////////////
// DOM ELEMENTS
//////////////////////////////////

const DOM = {
    grid: document.querySelector('.game__board'),
    cell: document.querySelector('.game__cell'),
    btnPlay: document.querySelector('.controls__button--play'),
    btnIterate: document.querySelector('.controls__button--iterate'),
    btnResize: document.querySelector('.controls__size-button'),
    inputHeight: document.getElementById('height'),
    inputWidth: document.getElementById('width'),
};

//////////////////////////////////
// SETTING UP GRID
//////////////////////////////////

const getGridSize = () => {
    let height = DOM.inputHeight.value;
    let width = DOM.inputWidth.value;
    
    if (!height || height < 20 ) {
        if (height < 20) {
            alert('🙏 To avoid breaking this design, height can be no fewer than 20 cells');    
        }
        height = 20;
        DOM.inputHeight.value = 20;
    } else if (height > 50) {
        height = 50;
        DOM.inputHeight.value = 50;
        alert('To avoid breaking this design, height can be no more than 50 cells. 😁');
    }
    
    if (!width || width < 20) {
        if (width < 20) {
            alert('👋 To avoid breaking this design, width can be no fewer than 20 cells.');    
        }
        width = 20;
        DOM.inputWidth.value = 20;
    } else if (width > 50) {
        width = 50;
        DOM.inputWidth.value = 50;
        alert('To avoid breaking this design, width can be no more than 50 cells. 🙃');
    }
    
    return [height, width];
};


const renderBoard = (start, end) => {
    if (start < end) {
        for (let i=start; i < end; i++) {
            let cell = document.createElement("div");
            cell.classList.add('game__cell', `game__cell--${i}`);
            DOM.grid.appendChild(cell);
        } 
    // Start at 900 // End at 400    
    } else if (start > end) {
        for (let i = start - 1; i >= end; i--) {
            const cell = document.querySelector(`.game__cell--${i}`);
            DOM.grid.removeChild(cell);
        }
    }  
};

const resizeCells = (size) => {
    const cells = [...document.querySelectorAll('.game__cell')];
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
    }

};

const clearBoard = () => {
    const cells = [...document.querySelectorAll('.game__cell--live')];
    
    cells.forEach(el => {
        el.classList.toggle('game__cell--live');
    });
};


const getData = (shouldIterate, height=20, width=20) => {
    const cellularAutomata = new CellularAutomata([height, width]); 
    cellularAutomata.fillWithDistribution([[0, 95], [1, 5]]);
    
    if (shouldIterate) {
        cellularAutomata.setRule('23/3').iterate(1);
    }

    return cellularAutomata.array.data;
};

const renderGame = (data) => {
    for (let i=0; i < data.length; i++) {
        const cell = document.querySelector(`.game__cell--${i}`);
        if (data[i] === 1) {
            cell.classList.add('game__cell--live');
        }
    }    
};


//////////////////////////////////
// EVENT LISTENERS
//////////////////////////////////

renderBoard(0, 400);

DOM.btnPlay.addEventListener('click', () => {
    clearBoard();
    let [currentHeight, currentWidth] = getGridSize();
    let data = getData(false, currentHeight, currentWidth);
    renderGame(data);
});

DOM.btnIterate.addEventListener('click', () => {
    let [currentHeight, currentWidth] = getGridSize();
    let data = getData(true, currentHeight, currentWidth);
    renderGame(data);
});

DOM.btnResize.addEventListener('click', () => {
    // Get current number of cells
    let currentCellCount = [...document.querySelectorAll('.game__cell')].length;
     
    // Get new height and width from input
    const [newHeight, newWidth] = getGridSize();
    
    // Reset CSS property grid-template-columns
    DOM.grid.style.gridTemplateColumns = `repeat(${newWidth}, auto)`;
    
    // Render the board
    let newCellCount = newHeight * newWidth;
    renderBoard(currentCellCount, newCellCount);
    
    if (newHeight > 20 && newHeight < 30) {
        resizeCells('medium');
    } else if (newHeight >= 30 && newHeight < 40) {
        resizeCells('small');
    } else if (newHeight >= 40) {
        resizeCells('tiny');
    }
    

    // Get data from game, given new height and width
    let data = getData(false, newHeight, newWidth);
    
    // Based on data, mark cells live
    renderGame(data);
});