# r/roguelikedev Roguelike Tutorial 2026
Native Javascript, no third party libraries

##  Part-5
Part-5 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-5/) is about "Placing Enemies and kicking them (harmlessly)" but, I am feeling a bit non-violent at the moment, so I call it "Placing and bumping actors".  

### Steps
- store entities in the game map
    - add entity rendering to map
    - update map creation to add entities (player)
- remove entities from the engine
    - update engine creation
    - remove entity rendering from engine
- paramaterize entities per room
- randomly generate entities in each room
- beef up the `Entity` class
- define player and two other actor entites
- place all entity creation in the level generator in `procgen.js`
- add `getBlockingEntity()` to map
- update `MoveAction` to check for blocking entities, rename
    - Make `MoveAction` a subclass of `DirectionAction`
    - Add new `BumpAction` subclass
    - update event handler
- add NPC actor turn handler to game loop

### How it went
The initial refactor is moving `entities[]` from the engine to the gameMap, including the function that renders them.  [Simple enough]().

## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-5/demo.html)

---
#### Navigation:    [Part-4](https://mootootwo.github.io/2026rltutorial/part-4/devblog)    ←    [Index](https://mootootwo.github.io/2026rltutorial/readme)    →    [Part-6](https://mootootwo.github.io/2026rltutorial/part-6/devblog)
