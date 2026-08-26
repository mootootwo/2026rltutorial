/* 
Entities are basic game objects
can be tiles, actors, items...
...Actually they can just be actors in this design pattern
Tiles are handled as a different sort of concept.
*/

export { Actor, Tile };

// Entities are currently === actors
// could include other objects
class Entity {
    // assigning default values to constructor
    // these should never be used, but may highlight errors
    constructor(
        x = 0,
        y = 0,
        char = "?",
        color = "#ffffff",
        name = "default",
        blocksMovement = false
    ) {
        this.x = x;
        this.y = y;

        // TODO: consider moving the char&color pair
        // to their own data type or class
        // as they are commonly used here
        // and in the .dark property
        this.char = char;    //character to be drawn
        this.color = color;  //colour of character

        this.name = name;
        this.blocksMovement = blocksMovement;
    }

    // creates a clone of an entity instanced from this class
    // usually from entityfactories.js
    spawn(gameMap, x, y) {
        const clone = structuredClone(this);
        Object.setPrototypeOf(clone, Actor.prototype);      // structured clone loses class inheritance
        clone.x = x;
        clone.y = y;
        gameMap.entities.push(clone);
        //return clone;     // not sure why the tutorial asks for this, seems to not be needed
    }

}

class Actor extends Entity {
    constructor(x, y, char, color, name, blocksMovement) {
        super(x, y, char, color, name, blocksMovement);
    }
    // allows the entity to move its self
    // sets desired delta-x and y,
    // event listener checks this when it triggers
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

// these are terrain tiles
// currently non-interactable
class Tile {
    constructor(passable, transparent, dark, light) {
        this.passable = passable;       //can it be moved onto?
        this.transparent = transparent; //can it be seen through?
        this.dark = dark;               //graphics when outside FoV
        this.light = light;             //graphics when inside FoV
    }
}