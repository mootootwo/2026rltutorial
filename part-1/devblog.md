# r/roguelikedev Roguelike Tutorial 2026
Native Javascript, no third party libraries

##  Part-1
Part-1 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-1/) is intended for you to draw the `@` symbol to the screen, and move it around with an input handler.

This project does not use the libtcod library, and we don't benefit from the python `print` function.  So, I first need to setup a rendering system.

If I was a little more adept at this sort of thing, I would want to be drawing SVG with WebGL.  I don't know all of the ins-and-outs of that though, and I haven't converted a font to SVG yet.  Since I want to keep this project as simple as possible, I will just be drawing text to canvas.  During [Part-0](https://mootootwo.github.io/2026rltutorial/part-0/devblog) I added a 16x16 terminal font to the project, and that is what will be used.

Steps:
- Create main() function
- Define the rendering space and tileset
- Create the game loop
- Draw the `@` on the canvas
- Create input handler
-- event listener
-- control mapping with actions

The first step is seting up the main() function as the primary game loop and writing "Hello world".  So I do that here

- 




## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/)
