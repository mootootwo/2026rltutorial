/* 
controls the primary game loop
serves as the main entrypoint that calls other functions
all paramaters should be defined at this level
*/

import { Display } from './display.js';
import { listenInput } from './input.js';
import { Actor, Tile } from './entities.js';
import { Engine } from './engine.js';
import { GameMap } from './gamemap.js';


// main game loop, calls everything else
function main() {

    //canvas geometry
    //32x20 is a scaled down 80x50
    const tileSize = 16;  //tile size in pixels
    const xTiles = 32; // width in default tiles
    const yTiles = 20; // height in default tiles

    //map geometry
    const xMap = 32;
    const yMap = 15; // reserve 5 tiles from total canvas size

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

    const display = new Display(fontName, tileSize, xTiles, yTiles);
    document.body.appendChild(display.canvas); // add dynamically created canvas to the html document
    display.ctx.scale(display.scale, display.scale); // Normalise coordinate system to use CSS pixels, based on device pixel ratio.

    // create player entity
    let player = new Actor(
        Math.floor(xTiles / 2), //position (in tiles) based on canvas dimensions
        Math.floor(yTiles / 2),
        "@",
        "#ffffff"
    );
    // create npc entity
    let npc = new Actor(
        Math.floor(xTiles / 2 - 5), //position (in tiles) based on canvas dimensions
        Math.floor(yTiles / 2),
        "@",
        "#ff00ff"
    );
    // define all tile types that will be sent to the map generator
    const tiles = {
        floor: new Tile(
            ".", "#555555",
            true, true, { char: ".", color: "#000000" }
        ),
        wall: new Tile(
            "#", "#aaaaaa",
            false, false, { char: "o", color: "#444466" }
        )
    };

    // array of all entities
    // for rendering and acting order
    let entities = [npc, player];

    //create game map
    let gameMap = new GameMap(xMap, yMap, tiles);

    // create game engine
    // and send various parts to it
    let engine = new Engine(
        entities,
        player,
        gameMap,

        //only need width and height
        //but i think a pointer to .canvas
        //may be smaller than new paramaters for width/height
        display.canvas,

        display.ctx,
        tileSize
    );

    //create input listener
    //tutorial wants this moved to engine,
    //but importing from input.js to engine.js
    //then calling engine.listener() 
    // does not seem to add value
    listenInput();

    //start the game loop
    requestAnimationFrame(() => engine.gameLoop());

}

main();