/* 
The engine is responsible for running the game:
draws the map and entities
handles player input
updates and moves entities
*/

import { escapeAction, moveAction } from './actions.js';
export { Engine };

class Engine {
    constructor(entities, player, canvas, ctx, tileSize) {
        this.entities = entities; // list of entities to be drawn
        this.player = player;
        this.canvas = canvas;
        this.ctx = ctx;
        this.tileSize = tileSize;
    }

    // check to see if an action is queued,
    // then update player position
    // #private method lets me call it elsewhere inside the class
    #handleEvents() {
        if (moveAction.dx || moveAction.dy) {
            this.player.move(moveAction.dx, moveAction.dy);
            moveAction.dx = null; // reset queued action when done
            moveAction.dy = null;
        } else if (escapeAction) {
            // TODO: I think the whole game-loop 
            // needs to be wrapped in a try/catch
            // for the escape action to break out of it
            return; // doesn't do anything yet
        }
    }

    //clears and redraws the canvas each frame
    //steps through entity list and draws each entity
    #render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear canvas each frame
        for (let i = 0; i < this.entities.length; i++) {
            this.ctx.fillStyle = this.entities[i].color;
            this.ctx.fillText(
                this.entities[i].char,
                this.entities[i].x * this.tileSize,
                this.entities[i].y * this.tileSize
            );
        }
    }


    //this is the main game loop
    //the tutorial's code waits on actions to be queued
    //this just calls requestanimationframe() for ticks
    // TODO: wrap this in a try/catch so we can use the escape handler
    gameLoop() {
        this.#render()
        this.#handleEvents();
        requestAnimationFrame(() => this.gameLoop()); //arrow function rebinds `this`
    };

}


