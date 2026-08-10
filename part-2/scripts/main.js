/* 
controls the primary game loop
serves as the main entrypoint that calls other functions
*/

import { Canvas } from './canvas.js';
import { escapeAction, moveAction } from './actions.js';
import { listenInput } from './input.js';
import { Entity } from './entities.js';


// main game loop, calls everything else
function main() {

    //canvas geometry
    //32x20 is a scaled down 80x50
    const tileSize = 16;  //tile size in pixels
    const xTiles = 32; // width in default tiles
    const yTiles = 20; // height in default tiles

    // create player entity
    let player = new Entity(
        Math.floor(xTiles / 2), //position (in tiles) based on canvas dimensions
        Math.floor(yTiles / 2),
        "@",
        "#ffffff"
    );
    // create npc entity
    let npc = new Entity(
        Math.floor(xTiles / 2 - 5), //position (in tiles) based on canvas dimensions
        Math.floor(yTiles / 2),
        "@",
        "#ff00ff"
    );
    // array of all entities
    // for rendering and acting order
    let entities = [npc, player];

    //font definition
    const fontName = "Wyse700b";
    const fontUrl = "fonts/Web437_Wyse700b.woff";

    //load the font
    const gameFont = new FontFace(fontName, "url(" + fontUrl + ")");

    //TODO: this async/await needs to be fixed up.. 
    //rendering starting before font is loaded
    gameFont.load().then(function (font) {
        document.fonts.add(font);
        console.log('Font loaded');
    });

    const canvas = new Canvas(fontName, tileSize, xTiles, yTiles);
    document.body.appendChild(canvas.canvas); // add dynamically created canvas to the html document
    canvas.ctx.scale(canvas.scale, canvas.scale); // Normalise coordinate system to use CSS pixels, based on device pixel ratio.

    // draw an entity using its properties
    function drawEnt(x, y, char, color) {
        canvas.ctx.fillStyle = color;
        canvas.ctx.fillText(char, x * tileSize, y * tileSize);
    }

    // check to see if an action is queued,
    // then update player position
    function update() {
        if (moveAction.dx || moveAction.dy) {
            player.move(moveAction.dx, moveAction.dy);
            moveAction.dx = null; // reset queued action when done
            moveAction.dy = null;
        }
    }

    //main game loop:
    // clear the canvas
    // draw stuff on the canvas
    // update positions of stuff
    // repeat
    function gameLoop() {
        canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height); //clear canvas each frame
        drawEnt(player.x, player.y, player.char, player.color);
        update();
        requestAnimationFrame(gameLoop);
    }

    //create input listener
    listenInput();

    //start the game loop
    requestAnimationFrame(gameLoop);

}

main();