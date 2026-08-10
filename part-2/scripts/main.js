/* 
controls the primary game loop
serves as the main entrypoint that calls other functions
*/

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

    //this async/await needs to be fixed up.. 
    //rendering starting before font is loaded
    gameFont.load().then(function (font) {
        document.fonts.add(font);
        console.log('Font loaded');
    });

    //setup the canvas
    const canvas = document.createElement("canvas"); // dynamically create a canvas
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio; // scaling to devicePixelRation theoretically improves crispness

    canvas.width = Math.floor((tileSize) * (xTiles) * scale);
    canvas.height = Math.floor((tileSize) * (yTiles) * scale);
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    canvas.style.outline = "1px solid #ffffff";
    canvas.style.backgroundColor = "#000000";

    // center canvas on the page
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.top = "50%";
    canvas.style.transform = "translate(-50%, -50%)";

    document.body.appendChild(canvas); // add dynamically created canvas to the html document

    // configure the canvas context to use our font
    ctx.font = tileSize + "px " + fontName;
    ctx.textBaseline = "top";
    ctx.imageSmoothingEnabled = false;
    ctx.scale(scale, scale); // Normalise coordinate system to use CSS pixels, based on device pixel ratio.

    ctx.fillStyle = "#ffffff"; // character colour that we will draw with

    // draw an entity using its properties
    function drawEnt(x, y, char, color) {
        ctx.fillStyle = color;
        ctx.fillText(char, x * tileSize, y * tileSize);
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
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas each frame
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