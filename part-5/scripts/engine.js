/* 
The engine is responsible for running the game:
draws the map and entities
handles player input
updates and moves entities
*/

import { InputHandler } from './input.js';

export { Engine };

class Engine {
    constructor(player, map, canvas, ctx, tileSize) {
        this.inputHandler = new InputHandler;
        this.player = player;
        this.map = map;
        this.canvas = canvas;
        this.ctx = ctx;
        this.tileSize = tileSize;

        this.action = null;
        this.setupListener();
    }

    setupListener() {
        window.addEventListener('keydown', (e) => {
            this.action = this.inputHandler.handleKeyDown(e);      //returns a movement action when key pressed
        });

    }

    // check to see if an action is queued,
    // then update player position
    // #private method lets me call it elsewhere inside the class
    #handleEvents() {
        // solution from Red Blob Games
        // handles child-actions created by BumpAction
        // not all action types need to be reset with engine.action=null
        // booping or successful movement are cleared by action.perform being unassigned
        if (this.action) {
            this.action = this.action.perform(this, this.player);
        }
    };

    // give each non-player actor the opportunity to act
    // can't be #private because it is called by player actions
    // TODO: improve gameloop / action queue to be more serial / synchronous
    handleNpcActions() {
        // loop through values in entities list
        // start at 1 because 0 should always be the player
        for (let i = 1; i < this.map.entities.length; i++) {
            console.log(this.map.entities[i].name + " wonders when it will get to act");
        }
    }

    //clears and redraws the canvas each frame
    //steps through entity list and draws each entity
    #render() {
        // clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear canvas each frame

        // draw the map
        this.map.render(this.ctx, this.tileSize);

    }

    //this is the main game loop
    //the tutorial's code waits on actions to be queued
    //this just calls requestanimationframe() for ticks
    gameLoop() {
        this.#render()
        try {
            this.#handleEvents()
        } catch (error) {
            console.log(error)
            if (error === "escape pressed") {
                console.error("exiting gameLoop()")
                return;
            };
        };
        requestAnimationFrame(() => this.gameLoop()); //arrow function rebinds `this`
    };

}


