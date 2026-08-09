/* 
This is the input listener
*/

import { escapeAction, moveAction } from './actions.js';

export { listenInput };

// listens for input and assigns an action from actions.js to each input
function listenInput() {

    document.querySelector("html").onkeydown = function (e) {
        // handles orthagonal movement and returns dx,dy as properties of moveAction()
        if (e.key == "w") moveAction(0, -1);
        if (e.key == "s") moveAction(0, 1);
        if (e.key == "a") moveAction(-1, 0);
        if (e.key == "d") moveAction(1, 0);

        // listens for an escape and does nothing yet
        if (e.key === "Escape") escapeAction();
    };
}

