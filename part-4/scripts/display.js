/* 
sets up the canvas and rendering context
*/

export { Display };

class Display {
    constructor(fontName, tileSize, xTiles, yTiles) {
        this.scale = window.devicePixelRatio; // scaling to devicePixelRation theoretically improves crispness
        // dynamically create a canvas
        // does not attatch it to the html page yet
        // could paramatarize the element name to allow multiple canvases    
        this.canvas = document.createElement("canvas");
        //canvas style properties
        this.canvas.width = Math.floor((tileSize) * (xTiles) * this.scale);
        this.canvas.height = Math.floor((tileSize) * (yTiles) * this.scale);
        this.canvas.style.width = this.canvas.width + "px";
        this.canvas.style.height = this.canvas.height + "px";
        this.canvas.style.outline = "1px solid #ffffff";
        this.canvas.style.backgroundColor = "#000000";
        // center canvas on the page
        this.canvas.style.position = "absolute";
        this.canvas.style.left = "50%";
        this.canvas.style.top = "50%";
        this.canvas.style.transform = "translate(-50%, -50%)";
        // create the context
        this.ctx = this.canvas.getContext("2d");
        // configure the canvas context to use the requested font
        this.ctx.font = tileSize + "px " + fontName;
        this.ctx.textBaseline = "top";
        this.ctx.imageSmoothingEnabled = false;
    }


    // move font loading in here?

    // move appending canvas to document body in here?


}