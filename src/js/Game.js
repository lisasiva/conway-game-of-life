/* jslint esnext: true */
import CellularAutomata from 'cellular-automata';

export default class Game {
    constructor() {
        // Initialize empty array to hold game data
        this.data = [];
    }
    
    getData(shouldIterate, height=20, width=20) {
        // Instantiate CellularAutomata with desired height and width
        const cellularAutomata = new CellularAutomata([height, width]); 
        
        // Select desired distribution of live cells
        cellularAutomata.fillWithDistribution([[0, 95], [1, 5]]);
        
        // If user has pressed iterate button, iterate
        if (shouldIterate) {
            cellularAutomata.setRule('23/3').iterate(1);
        }
        
        // Push resulting data into this.data
        this.data = [...cellularAutomata.array.data];
    }
}