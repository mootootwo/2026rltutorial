/* 
controls the primary game loop
serves as the main entrypoint that calls other functions
*/

// main game loop, calls everything else
function main() {
    console.log("hello world");

    //canvas geometry
    //32x20 is a scaled down 80x50
    const tileSize = 16;  //tile size in pixels
    const xTiles = 32; // width in default tiles
    const yTiles = 20; // height in default tiles

    //font definition
    const fontName = "Wyse700b";
    const fontUrl = "fonts/Web437_Wyse700b.woff";

    //load the font
    const gameFont = new FontFace(fontName, "url(" + fontUrl + ")");

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
    ctx.scale(scale, scale); // Normalize coordinate system to use CSS pixels, based on device pixel ratio.

    ctx.fillStyle = "#ffffff"; // character colour that we will draw with

    //setup the game loop
    setInterval(ctx.fillText("@", 1, 1), 16); //this is going to print the @ over its self on every 16ms

    //listen for input
    // this "return" call does not do much here,
    // it may be used to break out of the main loop later
    // it could also be the start of an error handler, 
    // but something would have to be reporting the return values
    document.querySelector("html").onkeydown = function (e) {
        if (e.key === "Escape") return;
    };

}

main();