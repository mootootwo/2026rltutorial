/* 
Entities are basic game objects
can be tiles, actors, items...
...Actually they can just be actors in this design pattern
Tiles are handled as a different sort of concept.
*/

export { Actor, Tile };

//
class Entity {
    constructor(x, y, char, color) {
        this.x = x;
        this.y = y;

        // TODO: consider moving the char&color pair
        // to their own data type or class
        // as they are commonly used here
        // and in the .dark property
        this.char = char;    //character to be drawn
        this.color = color;  //colour of character
    }
}

class Actor extends Entity {
    constructor(x, y, char, color) {
        super(x, y, char, color);
    }
    // allows the entity to move its self
    // sets desired delta-x and y,
    // event listener checks this when it triggers
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

class Tile {
    constructor(passable, transparent, dark, light) {
        //this.char = char;
        //this.color = color;
        this.passable = passable;       //can it be moved onto?
        this.transparent = transparent; //can it be seen through?
        this.dark = dark;               //graphics when outside FoV
        this.light = light;             //graphics when inside FoV
    }
}

