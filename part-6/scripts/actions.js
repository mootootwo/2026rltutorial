/* 
These are actions that can be assigned to inputs
*/

export { EscapeAction, BumpAction };

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

// This action is created from a direction key being pressed
class DirectionAction extends Action {
    constructor(dx, dy) {
        super();            // i don't understand how they empty list picks up from the parent
        this.dx = dx;
        this.dy = dy;
    }

    perform() {
        // TODO
    }
}

// this determines if an action should move or interact
class BumpAction extends DirectionAction {
    perform(engine, entity) {
        let x = entity.x + this.dx;
        let y = entity.y + this.dy;

        // if there is a blocking entity in the destination square
        // try boop it.  If not, move there.
        if (engine.map.getBlockingEntity(x, y)) {
            //engine.action = null;
            return new BoopAction(this.dx, this.dy);
        } else {
            //engine.action = null;
            return new MoveAction(this.dx, this.dy);
        }
    }
}

// boops or interacts with another entity
class BoopAction extends DirectionAction {
    perform(engine, entity) {
        let x = entity.x + this.dx;
        let y = entity.y + this.dy;
        let target = engine.map.getBlockingEntity(x, y);
        if (!target) {
            //engine.action = null; // reset queued action
            throw "No entity to boop at " + x + ", " + y;
        }
        console.log("You boop " + target.name + " at " + x + ", " + y);
        engine.handleNpcActions();
    }
}

// moves the actor in the direction indicated
class MoveAction extends DirectionAction {
    // I don't understand how MoveAction picks up dx, dy 
    // from DirectionAction without constructor() and super()

    perform(engine, entity) {
        let x = entity.x + this.dx;
        let y = entity.y + this.dy;

        // TODO: I think these if statements can be unchained
        // since they each throw an error
        if (!engine.map.inBounds(x, y)) {
            engine.action = null; // reset queued action
            throw x + ", " + y + " out of bounds";
        } else if (!engine.map.grid[x][y].passable) {
            engine.action = null; // reset queued action
            throw x + ", " + y + " blocked by tile";
        } else if (engine.map.getBlockingEntity(x, y)) {
            engine.action = null; // reset queued action
            throw x + ", " + y + " blocked by entity " + engine.map.getBlockingEntity(x, y).name;
        } else {
            entity.move(this.dx, this.dy);                      // move the entity
            //engine.action = null;                               // reset queued action when done

            // placing FOV refresh in movement action,
            // so it only happens when the player moves
            // will need to not update for NPCs, 
            // once other entities start acting
            try {
                engine.map.refreshVisibility(entity.x, entity.y, 8)
            } catch {
                console.log("refreshFOV error")         //.error() messages don't stack, so using .log() to avoid spam
            };
            engine.handleNpcActions();

        }
    }
}