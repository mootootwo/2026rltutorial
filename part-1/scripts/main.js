/* 
controls the primary game loop
serves as the main entrypoint that calls other functions
*/

import { escapeAction, moveAction } from './actions.js';
import { listenInput } from './input.js';


// main game loop, calls everything else
function main() {

    //canvas geometry
    //32x20 is a scaled down 80x50
    const tileSize = 16;  //tile size in pixels
    const xTiles = 32; // width in default tiles
    const yTiles = 20; // height in default tiles

    // initial player position (in tiles) based on screen dimensions
    let playerX = Math.floor(xTiles / 2);
    let playerY = Math.floor(yTiles / 2);

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

    // draw the `@` at player position
    function drawPlayer(x, y) {
        ctx.fillText("@", x * tileSize, y * tileSize);
    }

    // check to see if an action is queued,
    // then update player position
    function update() {
        if (moveAction.dx || moveAction.dy) {
            playerX += moveAction.dx;
            playerY += moveAction.dy;
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
        drawPlayer(playerX, playerY);
        update();
        requestAnimationFrame(gameLoop);
    }

    //create input listener
    listenInput();

    //start the game loop
    requestAnimationFrame(gameLoop);

}

main();