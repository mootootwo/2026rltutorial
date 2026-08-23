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
        this.grid = this.generateMap(this.tiles.floor);
        this.visible = [this.generateMap(false)];
        this.explored = [this.generateMap(false)];
    }

    generateMap(type) {
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
                grid[i][j] = type;        // fill with floor tiles
            }
        }

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

    // draws the map to the canvas,
    // using the provided rendering context
    // this could just live in engine.js
    render(ctx, tileSize) {
        for (let i = 0; i < this.grid.length; i++) {        // width, or columns
            for (let j = 0; j < this.grid[i].length; j++) { // length or rows
                ctx.fillStyle = this.grid[i][j].color;
                ctx.fillText(
                    this.grid[i][j].char,
                    i * tileSize,
                    j * tileSize
                );
            }
        }
    }


}