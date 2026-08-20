# r/roguelikedev Roguelike Tutorial 2026
Native Javascript, no third party libraries

##  Part-2
Part-2 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-2/) creates a generic entity and makes other game objects children of it, creates an "engine" that holds the main game loop and the renderer, and draws a map with some tiles.

### Steps
- Create generic `Entity` class
    - Create the player and an NPC as children of the generic entity
- Update the draw call with the new player object
- Create an `Engine` class 
- Create a `render()` method and a list of entities to be rendered
- Create `GameMap` class
- Create tiles
    - floors
    - walls
- Initialise map with floors
- Add walls to map
- Add check to map for "in-bounds"
- Feed map into engine
- Check for walkability when moving
- Pass engine and entities to actions
- Move walkability check from engine to actions

### How it went
Shifting the player to the new Entity class was identical to the tutorial, and the first part is [here](https://github.com/mootootwo/2026rltutorial/commit/3a5ca269eb9bdaa5232e8c54ca170bd009e39688).  The only difference is that my draw function took a little more building, since I don't have python's print function waiting to take the colour paramater.

Next I move the canvas setup and context creation into a class in `display.js` to help keep `main()` a little more clear.  Having the display elements in their own file will end up looking more like the tutorial, since all the console drawing in the tutorial is called from library functions external to main.py.  Most of my function calls are still in `main()` but more could probably be moved to the `Display` class in the future.  See this done [here](https://github.com/mootootwo/2026rltutorial/commit/ac445bb89b30f4362235e637f28a1a10a280747e) -- though the class and object names are changed from `Canvas` to `Dispay` in the subsequent two commits.

When creating an `Engine` class, I started thinking more about how to improve the game loop so that it can handle escape events and other input.  I also struggled with JS contexts a bit and, with the help of CatPlusPlus from the roguelike Discord, got it sorted out with some arrow functions in the right places.  This step is implemented [here](https://github.com/mootootwo/2026rltutorial/commit/c828954e0c3270fb350c7cfa80463c3a1a6cf554).

When the tutorial describes how the `Tile` class should be created, my first instinct is to make it a child of Entity instead, separating entities into actors and tiles.

Working through the rest of Part-2, I came to unerstand that my way would have created each tile as a unique object that has attributes that can be modified, as if it was a physics object in an immersive sim.  The tutorial's intention is to make all tiles pointers to a single common generic object for their type.

Ultimately I ended up following the tutorial method, as it will have the added benefit of teaching me some new ways to think about design patterns.

Creating the game map involves some library functions and python features that I don't understand, so I'm doing my best to emulate what I think the intention is.  One difference at this stage, is that I have placed the `render()` function for the game map in `engine.js` with the other drawing and render calls, and have avoided having to pass `ctx` to the game map.  The results of this are [here](https://github.com/mootootwo/2026rltutorial/commit/8dd1eca060b8b1abe26bcca47b97000bc69a547b).

For the final steps of Part-2, the tutorial wants to pass the engine into that `Action` class that I never created in Part-1.  Now that I can sort of see what it is trying to do, I replace my `escapeAction()` and `moveAction()` functions with the classes the tutorial asks for.

The problem I run into when turning my action functions into classes and moving them out of `engine.js`, is that my input listener does not match the tutorial design.  I have found a really clean example of how to do this in jarrahtech's [2022 version of this tutorial in JS](https://github.com/jarrahtech/RoguelikeTutorial2022/blob/f3d456c75cdfe5daf13bfac72f6c1820d7d29d09/assets/engine.js)

I don't want to just copy jarrahtech's implementation, especially since he is doing something with his input listener that I don't totally understand.  I struggled with this for a while and ended up consulting a chatbot for some pointers, and adapted its suggestions to fit into a code in a way that I understand.  This is the [final commit]() of Part-2.

## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-2)

---
#### Navigation:    [Part-1](https://mootootwo.github.io/2026rltutorial/part-1/devblog)    ←    [Index](https://mootootwo.github.io/2026rltutorial/readme)    →    [Part-3](https://mootootwo.github.io/2026rltutorial/part-3/devblog)
