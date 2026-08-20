/* 
Creates and draws the game map
handles logic related to the map
*/

export { GameMap };

class GameMap {
    constructor(width, height, tiles) {
        this.width = width;
        this.height = height;
        this.tiles = tiles;
        this.grid = this.generateMap();
    }

    generateMap() {
        let grid = [];

        // fill each column (i)
        // with floor tiles
        // by stepping through 
        // every row (j) per column
        for (let i = 0; i < this.width; i++) {        // width, or columns
            grid[i] = [];                            // initialize each column as an array
            for (let j = 0; j < this.height; j++) {   // height, or rows

                // TODO: i don't like this because
                // it preassumes knowledge of the tile types
                // defined in a higher level function
                grid[i][j] = this.tiles.floor;        // fill with floor tiles
            }
        }
        //make a little 3-tile wall for testing
        grid[10][7] = this.tiles.wall;
        grid[11][7] = this.tiles.wall;
        grid[12][7] = this.tiles.wall;

        return grid;       // return the completed array
    }

    // returns True if inside the map area
    inBounds(x, y) {
        return (
            0 <= x &&
            x < this.width &&
            0 <= y &&
            y < this.height
        );
    }


}