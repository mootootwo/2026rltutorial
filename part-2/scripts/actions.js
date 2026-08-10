/* 
These are actions that can be assigned to inputs
*/

export { escapeAction, moveAction };

// returns change in x,y position as properties
function moveAction(dx, dy) {
    moveAction.dx = dx;
    moveAction.dy = dy;
}

// this just sort of exists in spirit to write something to the console.
// properly, it should break or return out of the main game loop and halt rendering
// but I don't know how to do that in a simple way
function escapeAction() {
    console.log("escape pressed");
}