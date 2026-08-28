/* 
This handles input recieved from the listener,
and calls actions in response
*/

import { EscapeAction, BumpAction } from './actions.js';

export { InputHandler };

class InputHandler {
    constructor(engine) {
        this.engine = engine;
    }

    handleEvents() {
        // TODO: this is where an event queue would go in
        // loop through event or action queue,
        // and do each step in this method

        if (!action) {
            return;
        }

        action.perform();
        this.engine.handleNpcActions();
        this.engine.map.refreshVisibility(entity.x, entity.y, 8);

    }

    handleKeyDown(e) {
        const player = this.engine.player;

        // handles orthagonal movement
        if (e.key == "w") return new BumpAction(player, 0, -1);
        if (e.key == "s") return new BumpAction(player, 0, 1);
        if (e.key == "a") return new BumpAction(player, -1, 0);
        if (e.key == "d") return new BumpAction(player, 1, 0);

        // listens for an escape and does nothing yet
        if (e.key === "Escape") return new EscapeAction(player);
    }

}
