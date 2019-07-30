/* jslint esnext: true */
import CellularAutomata from 'cellular-automata';

export default class Game {
    constructor(height=20, width=20) {
        // Initialize empty array to hold game data
        this.cellularAutomata = new CellularAutomata([height, width]);
        this.cellularAutomata.fillWithDistribution([[0, 70], [1, 30]]);
        this.data = [...this.cellularAutomata.array.data];
    }
    
    getData(shouldIterate) {
        // Instantiate CellularAutomata with desired height and width
        //const cellularAutomata = new CellularAutomata([height, width]); 
        
        // Select desired distribution of live cells
        //cellularAutomata.fillWithDistribution([[0, 95], [1, 5]]);
        
        // If user has pressed iterate button, iterate
        if (shouldIterate) {
            this.cellularAutomata.setRule('23/3').iterate(1);
        }
        
        // Push resulting data into this.data
        this.data = [...this.cellularAutomata.array.data];
    }
}