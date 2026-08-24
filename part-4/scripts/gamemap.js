/* 
Creates and draws the game map
handles logic related to the map

Adapts some field-of-view code from https://github.com/maetl/roguelike-tutorial/commit/bb81d89e6ee820f1b6772454246d9968113f66f7#diff-bfe9874d239014961b1ae4e89875a6155667db834a410aaaa2ebe3cf89820556
need to understand this better
*/

import { createFOV } from "./fov.js";
export { GameMap };

class GameMap {
    constructor(width, height, tiles) {
        this.width = width;
        this.height = height;
        this.tiles = tiles;
        this.grid = this.generateMap(this.tiles.floor);
        this.visible = this.generateMap(false);
        this.explored = this.generateMap(false);
        this.refreshFOV = createFOV(
            this.width,
            this.height,
            // I don't understand how these arrow functions work
            (x, y) => this.revealTile(x, y),
            (x, y) => this.isOpaque(x, y)
        );
    }

    generateMap(type) {
        let grid = [];

        // fill each column (i)
        // with a tile type or other value
        // by stepping through 
        // every row (j) per column
        for (let i = 0; i < this.width; i++) {          // width, or columns
            grid[i] = [];                               // initialize each column as an array
            for (let j = 0; j < this.height; j++) {     // height, or rows
                grid[i][j] = type;                      // fill with some value (eg: floor tiles)
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

    // it seems like "isPassable" belongs here as a "getter"

    // check if the tile can be seen-through
    // inverting logic to preserve compatability with my imported FOV function
    // TODO: make consistent
    isOpaque(x, y) {
        return !this.grid[y][x].transparent;
    }

    // if the tile is in the "visible" array, it should be in the field of view
    isVisible(x, y) {
        return this.visible[x][y];
    }

    // if the tile is in the "explored" array, it is or has been "visible" previously
    isExplored(x, y) {
        return this.explored[x][y];
    }

    // for tiles in the field of view, make visible and explored.
    revealTile(x, y) {
        this.visible[x][y] = true;
        this.explored[x][y] = true;
    }

    // takes player x, y, and visibility range
    refreshVisibility(x, y, r) {
        this.visible = this.generateMap(false);      // clear previously visible tiles
        this.refreshFOV(x, y, r);                    // find visible tiles based on current location
    }

    // draws the map to the canvas,
    // using the provided rendering context
    // this could just live in engine.js
    render(ctx, tileSize) {
        for (let i = 0; i < this.grid.length; i++) {        // width, or columns
            for (let j = 0; j < this.grid[i].length; j++) { // length or rows
                // check if tile is in "visible" array,
                // then render with "light" graphics
                if (this.visible[i][j]) {
                    ctx.fillStyle = this.grid[i][j].light.color;
                    ctx.fillText(
                        this.grid[i][j].light.char,
                        i * tileSize,
                        j * tileSize
                    );
                } else if (this.explored[i][j]) {
                    ctx.fillStyle = this.grid[i][j].dark.color;
                    ctx.fillText(
                        this.grid[i][j].dark.char,
                        i * tileSize,
                        j * tileSize
                    );
                } else {
                    ctx.fillStyle = this.tiles.shroud.color;
                    ctx.fillText(
                        this.tiles.shroud.char,
                        i * tileSize,
                        j * tileSize
                    );
                }
            }
        }
    }
}