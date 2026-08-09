# r/roguelikedev Roguelike Tutorial 2026
Native Javascript, no third party libraries

##  Part-1
Part-1 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-1/) is intended for you to draw the `@` symbol to the screen, and move it around with an input handler.

This project does not use the libtcod library, and we don't benefit from the python `print` function.  So, I first need to setup a rendering system.

If I was a little more adept at this sort of thing, I would want to be drawing SVG with WebGL.  I don't know all of the ins-and-outs of that though, and I haven't converted a font to SVG yet.  Since I want to keep this project as simple as possible, I will just be drawing text to canvas.  During [Part-0](https://mootootwo.github.io/2026rltutorial/part-0/devblog) I added a 16x16 terminal font to the project, and that is what will be used.

Steps:
- Create main() function
- Define the rendering area and tileset
- Create the game loop
- Draw the `@` on the canvas
- Create input handler
    - event listener
    - mapping input events to actions

The first step is seting up the main() function as the primary game loop and writing "Hello world".  So I do that [here](https://github.com/mootootwo/2026rltutorial/commit/508cb384ddca78049084b9c5fd4479185e76836f).

Next, the tutorial imports the tile set, defines the rendering geometry, sets up a listener for an escape event, and draws the `@` symbol.  All right in the `main()` function.

Since I don't have library functions to do most of that for me, it is a lot of code to dump right in `main()`.  But, in the spirit of following instructions, I do that [here](https://github.com/mootootwo/2026rltutorial/commit/6146a9d564093a48f0bd8f325151c62104345783). It is okay though, some commands will be moved to their own functions in the next step and more in Part-2.

The escape input handler in the above commit does work (I can step through it in the stack trace) but doesn't really do anything, since it exists outside of the "game loop" for now. I probably should have made it output to the console instead of dumping a return value, but whatever.

A notable difference is that I use `setInterval()` instead of `while(true)` as the later tends to blow up my browser.  This is going to be a problem very quickly, because I have neglected the actual part that is the "game loop" -- specifically the part that is waiting on the next input event.  This is a turn-based roguelike, not a realtime game, so it does not need game updates on a 60-tick per second framerate; instead it needs game state updates per-turn.

I need to fix this, so I must figure out what tcod and/or rot.js are doing with their event engines and implement it on my own.  [luetkemj](https://github.com/luetkemj/jsrlt/) and [maetl](https://github.com/maetl/roguelike-tutorial/) both have JS conversions of this tutorial, and those are good resources for me here.

For the final section of Part-1, the tutorial wants us to keep track of the player position, modify it via user input (ie, let you move the `@` around), and shift the input handling to its own file.

The tutorial asks us to define movement and escape actions as subclasses of an `Action` class, in an object oriented sort of way.  I understand that these sorts of tutorials like to walk you through several different programming paradigms, but I honestly couldn't see any reason for using a JS "class" -- I think it might be related to the tutorial being writen for Python.  So I just created `moveAction()` and `escapeAction()` as functions and got on with it.

Oh, the "return" type escape action I described before?  I changed it to a simple console log action when moving it to the `actions.js`.  Sorry, I didn't make a commit or checkpoint between these parts of the tutorial.

The tutorial wants to use `else if` statements for handling input, meaning that the handler will stop on the first match.  There are a lot of ways to do this, In school in the 90s I was taught to use `case` statements.  You can profile these to see which is more performant but, in JS, it is a bit browser-specific and also irrevelant at this scale.  I chose to use plain and un-nested `if` statements which may be slightly inefficient on a per-keystroke basis, but my thinking was that it might be better at catching combination key presses.  My thinking was obviously wrong because the events I am listening for are `.onkeydown`.

See this implemented [here]().

Whoops! The final step is to clear the screen between frames.  Pretty straightforward to fix, just slipping a clearRect() into each refresh interval.

This should be the final code for [Part-1]() along with a working [demo](https://mootootwo.github.io/2026rltutorial/part-1/demo.html).

## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/)
