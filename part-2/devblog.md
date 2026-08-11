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

Next I move the canvas setup and context creation into a class in `display.js` to help keep `main()` a little more clear.  This will end up looking more like the tutorial, since all the console drawing there is called from library functions external to main.py.  Most of the function calls are still in `main()` but more could probably be moved to the `Display` class in the future.  See this done [here](https://github.com/mootootwo/2026rltutorial/commit/ac445bb89b30f4362235e637f28a1a10a280747e) -- though the class and object names are changed from `Canvas` to `Dispay` in the subsequent two commits.

When creating an `Engine` class, I started thinking more about how to improve the game loop so that it can handle escape events and other input.  I also struggled with JS contexts a bit and, with the help of CatPlusPlus from the roguelike Discord, got it sorted out with some arrow functions in the right places.  This step is implemented [here](https://github.com/mootootwo/2026rltutorial/commit/c828954e0c3270fb350c7cfa80463c3a1a6cf554).


## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-2)
