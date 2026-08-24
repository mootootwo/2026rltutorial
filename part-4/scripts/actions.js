/* 
These are actions that can be assigned to inputs
*/

export { Action, EscapeAction, MoveAction };

class Action {

    // putting this here for inheritance?
    // don't really understand what I am copying
    perform(engine, entity) {
        //not implemented but needed for inheritance??
    }
}

// TODO: reconsider
// the escape action does not have an entity or actor
// should it inherit from Action?  
// should Action have the entity property?
class EscapeAction extends Action {
    perform() {
        throw "escape pressed";
    }
}

class MoveAction extends Action {
    constructor(dx, dy) {
        super();            // i don't understand how they empty list picks up from the parent
        this.dx = dx;
        this.dy = dy;
    }


    perform(engine, entity) {
        let x = entity.x + this.dx;
        let y = entity.y + this.dy;

        if (!engine.map.inBounds(x, y)) {
            engine.action = null; // reset queued action
            throw x + ", " + y + " out of bounds";
        } else if (!engine.map.grid[x][y].passable) {
            engine.action = null; // reset queued action
            throw x + ", " + y + " not passable";
        } else {
            entity.move(this.dx, this.dy);                      // move the entity
            engine.action = null;                               // reset queued action when done
        }
    }
}