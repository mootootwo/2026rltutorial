/* 
This handles input recieved from the listener,
and calls actions in response
*/

import { EscapeAction, MoveAction } from './actions.js';

export { InputHandler };

class InputHandler {

    handleKeyDown(e) {
        // handles orthagonal movement
        if (e.key == "w") return new MoveAction(0, -1);
        if (e.key == "s") return new MoveAction(0, 1);
        if (e.key == "a") return new MoveAction(-1, 0);
        if (e.key == "d") return new MoveAction(1, 0);

        // listens for an escape and does nothing yet
        if (e.key === "Escape") return new EscapeAction;
    }

}
