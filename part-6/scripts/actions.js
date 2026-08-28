/* 
These are actions that can be assigned to inputs
*/

export { EscapeAction, BumpAction };

class Action {
    constructor(entity) {
        this.entity = entity;
        this.engine = this.entity.gameMap.engine;
    }

    // putting this here for inheritance?
    // don't really understand what I am copying
    //perform(engine, entity) {
    perform() {
        //not implemented but needed for inheritance??
        //is overwritten by subclasses
    }


}

// Breaks out of the game loop, halts refresh
class EscapeAction extends Action {
    perform() {
        throw "escape pressed";
    }
}

// This action is created from a direction key being pressed
class DirectionAction extends Action {
    constructor(entity, dx, dy) {
        super(entity);
        this.dx = dx;
        this.dy = dy;
    }

    // returns the action's destination
    getDestination() {
        return {
            x: this.entity.x + this.dx,
            y: this.entity.y + this.dy
        }
    }

    // returns any blocking entity
    // sends the output of private method getDestination()
    // to map.getBlockingEntity as two paramaters for x,y
    getBlockingEntity() {
        const dest = this.getDestination();
        return this.engine.map.getBlockingEntity(dest.x, dest.y);
    }

    perform() {
        // not implemented
    }
}

// this determines if an action should move or interact
class BumpAction extends DirectionAction {
    perform() {

        // if there is a blocking entity in the destination square
        // try boop it.  If not, move there.
        if (this.getBlockingEntity()) {  // should be the same as (target.x, target.y)
            //engine.action = null;
            return new BoopAction(this.entity, this.dx, this.dy);
        } else {
            //engine.action = null;
            return new MoveAction(this.entity, this.dx, this.dy);
        }
    }
}

// boops or interacts with another entity
class BoopAction extends DirectionAction {
    perform() {
        const target = this.getBlockingEntity();

        if (!target) {
            //engine.action = null; // reset queued action
            throw "No entity to boop at " + target.x + ", " + target.y;
        }
        console.log("You boop " + target.name + " at " + target.x + ", " + target.y);
        this.engine.handleNpcActions();
    }
}

// moves the actor in the direction indicated
class MoveAction extends DirectionAction {
    // I don't understand how MoveAction picks up dx, dy 
    // from DirectionAction without constructor() and super()

    perform() {
        const dest = this.getDestination();

        // TODO: I think these if statements can be unchained
        // since they each throw an error
        if (!this.engine.map.inBounds(dest.x, dest.y)) {
            this.engine.action = null; // reset queued action
            throw dest.x + ", " + dest.y + " out of bounds";
        } else if (!this.engine.map.grid[dest.x][dest.y].passable) {
            this.engine.action = null; // reset queued action
            throw dest.x + ", " + dest.y + " blocked by tile";
        } else if (this.engine.map.getBlockingEntity(dest.x, dest.y)) {
            this.engine.action = null; // reset queued action
            throw dest.x + ", " + dest.y + " blocked by entity " + this.engine.map.getBlockingEntity(dest.x, dest.y).name;
        } else {
            this.entity.move(this.dx, this.dy);                      // move the entity
            //engine.action = null;                               // reset queued action when done

            // placing FOV refresh in movement action,
            // so it only happens when the player moves
            // will need to not update for NPCs, 
            // once other entities start acting
            try {
                this.engine.map.refreshVisibility(this.entity.x, this.entity.y, 8)
            } catch {
                console.log("refreshFOV error")         //.error() messages don't stack, so using .log() to avoid spam
            };
            this.engine.handleNpcActions();

        }
    }
}