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
        gameMap = null,
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

        // add entity to gamemap entities[] list
        // only if gamemap has been provided
        if (gameMap) {
            this.gameMap = gameMap;
            gameMap.entities.add(this);
        }
    }

    // creates a clone of an entity instanced from this class
    // usually from entityfactories.js
    spawn(gameMap, x, y) {
        const clone = structuredClone(this);
        Object.setPrototypeOf(clone, Actor.prototype);      // structured clone loses class inheritance
        clone.x = x;
        clone.y = y;
        clone.gameMap = gameMap;
        gameMap.entities.push(clone);
        //return clone;     // not sure why the tutorial asks for this, seems to not be needed
    }

    // place this entity at a new location, without cloning
    // allows being placed on different gamemap
    place(x, y, gameMap) {
        this.x = x;
        this.y = y

        // if a gamemap is provided,
        // remove current gamemap reference
        // add new gamemap reference
        if (gameMap) {
            // remove existing gameMap reference, if there is one
            if (this.gameMap) {
                //TODO: it might be better to replace this array with a set
                const i = this.gameMap.entities.indexOf(this);
                if (i !== -1) {
                    this.gameMap.entities.splice(i, 1);
                }
            }
            this.gameMap = gameMap;
            gameMap.entities.push(this);
        }
    }
}

class Actor extends Entity {
    constructor(gameMap, x, y, char, color, name, blocksMovement) {
        super(gameMap, x, y, char, color, name, blocksMovement);
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