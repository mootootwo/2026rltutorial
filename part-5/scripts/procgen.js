/* 
This is the procedural generator used for the map
*/

import { GameMap } from "./gamemap.js";
import { randomRange } from "./utility.js";

// importing data / plain objects / literals into this module
// makes me very unhappy
// TODO: I feel like all data should be read into main() 
// as the primary entrypoint
import { bigU, lilU } from "./entityfactories.js"

export { generateLevel };

// generates a rectangular room
// starting point x,y is top left corner
class RectRoom {
    constructor(x, y, width, height) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + width - 1;
        this.y2 = y + height - 1;
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

    // returns TRUE if the room overlaps another room
    intersects(other) {
        return (
            this.x1 <= other.x2 &&
            this.x2 >= other.x1 &&
            this.y1 <= other.y2 &&
            this.y2 >= other.y1
        )
    }
}

// creates a new map from gamemap.js
// fills it with features (rooms, paths)
// returns populated map
function generateLevel(
    maxRooms,
    minRoomSize,
    maxRoomSize,
    maxNpcPerRoom,
    width,
    height,
    tiles,
    player
) {
    // array of all entities
    // for rendering and acting order
    let entities = [player];
    const level = new GameMap(width, height, tiles, entities);
    level.rooms = [];

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

    // return "L" shaped tunnel between two points
    // this was supposed to use a yield / generator function
    // and bresenham lines or similar LoS tracing
    // but I just sort of brute forced it with conditional logic
    // TODO: see if this can be improved
    function pathBetween(x1, x2, y1, y2) {
        //endpoint 1 = x1, y1
        //endpoint 2 = x2, y2

        if (Math.random() < 0.5) {   // 50% chance  TODO: replace math.random()
            // path horizontal, then vertical
            for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {    // TODO: move the min/max calc outside the loop
                level.grid[i][y1] = tiles.path;                             // instead of directly modifying the grid, maybe the output can "yield" a stream of coords?
            }
            for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
                level.grid[x2][j] = tiles.path;
            }
        } else {
            // path vertical, then horizontal
            for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
                level.grid[x1][j] = tiles.path;
            }
            for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
                level.grid[i][y2] = tiles.path;
            }
        }
    }

    // place entities in a room
    function placeEntities(room, level, maxNpcPerRoom) {
        const totalNpc = randomRange(0, maxNpcPerRoom);

        // place NPC entities in the room
        for (let i = 0; i < totalNpc; i++) {
            // pick a location inside the rooms walls
            const x = randomRange(room.x1 + 2, room.x2 - 2);
            const y = randomRange(room.y1 + 2, room.y2 - 2);

            // make sure the coords for the new entity
            // do not overlap with an existing one
            for (let j = 0; j < entities.length; j++) {
                // if the new entity overlaps an existing one
                // exit this itteration of the loop
                if (entities[j].x === x && entities[j].y === y) {
                    break;
                    // else add a new entity of random type
                } else {
                    if (Math.random() < 0.8) {  // TODO: replace Math.random()
                        // place TYPE A npc
                        bigU.spawn(level, x, y)
                    } else {
                        // place TYPE B npc
                        lilU.spawn(level, x, y)
                    }

                }
            }
        }
    }

    // creates RectRooms
    // checks for overlap
    // and fills rooms[] with them 
    for (let i = 0; i < maxRooms; i++) {
        const rWidth = randomRange(minRoomSize, maxRoomSize);
        const rHeight = randomRange(minRoomSize, maxRoomSize);

        let x = randomRange(0, width - rWidth - 1);
        let y = randomRange(0, height - rHeight - 1);

        // define coords for a potential room
        let newRoom = new RectRoom(x, y, rWidth, rHeight);

        // adds the first room to the list of rooms
        if (level.rooms.length === 0) {
            level.rooms.push(newRoom);
        } else {
            // tests to see if the new room intersects any existing rooms
            let j = 0;
            for (; j < level.rooms.length; j++) {
                if (level.rooms[j].intersects(newRoom)) {
                    break;
                }
            }
            // only if the above loop
            // ran through without finding intersections
            if (j === level.rooms.length) {

                placeEntities(newRoom, level, maxNpcPerRoom);    // add NPCs to room
                level.rooms.push(newRoom);                       // add room to array
            }
        }
    };

    // place all rooms
    for (let i = 0; i < level.rooms.length; i++) {
        placeRoom(level.rooms[i]);
    };
    // make paths between rooms
    for (let i = 0; i < level.rooms.length; i++) {
        let c1 = level.rooms[i].center();
        let c2 = level.rooms.at(i - 1).center();
        pathBetween(c1.x, c2.x, c1.y, c2.y);
    };

    const c0 = level.rooms[0].center();
    player.x = c0.x;
    player.y = c0.y;

    return level;
}



