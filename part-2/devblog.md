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






## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-2)
