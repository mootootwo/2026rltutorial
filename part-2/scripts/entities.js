/* 
Entities are basic game objects
can be tiles, actors, items...
*/

export { Entity };

//
class Entity {
    constructor(x, y, char, color) {
        this.x = x;
        this.y = y;
        this.char = char;    //character to be drawn
        this.color = color;  //colour of character
    }

    // allows the entity to move its self
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}