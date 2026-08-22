/* 
This is the procedural generator used for the map
*/

import { GameMap } from "./gamemap.js";
export { generateLevel };

// generates a rectangular room
// starting point x,y is top left corner
class RectRoom {
    constructor(x, y, width, height) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + width;
        this.y2 = y + height;
    }

    // returns the centerpoint of the room
    center() {
        let cx = Math.floor((this.x1 + this.x2) / 2);
        let cy = Math.floor((this.y1 + this.y2) / 2);

        return { x: cx, y: cy };
    }

    // returns coordinates of the inner borders of the room
    inner() {
        return {
            x1: (this.x1 + 1),
            x2: (this.x2 - 1),
            y1: (this.y1 + 1),
            y2: (this.y2 - 1)
        }
    }
}

function generateLevel(width, height, tiles) {
    const level = new GameMap(width, height, tiles);

    const room1 = new RectRoom(10, 5, 5, 7);
    const room2 = new RectRoom(17, 5, 5, 7);

    // draw walls around the inner portion of a room
    function placeRoom(room) {
        const inner = room.inner();

        // create top and bottom walls of the room
        for (let i = inner.x1; i <= inner.x2; i++) {        // width, or columns
            level.grid[i][inner.y1] = tiles.wall;                 // top wall
            level.grid[i][inner.y2] = tiles.wall;                 // bottom wall
        }
        // cereate left and right walls of the room
        for (let j = inner.y1 + 1; j < inner.y2; j++) {        // width, or columns
            level.grid[inner.x1][j] = tiles.wall;                 // top wall
            level.grid[inner.x2][j] = tiles.wall;                 // bottom wall
        }
    }

    placeRoom(room1);
    placeRoom(room2);
    return level;
}



