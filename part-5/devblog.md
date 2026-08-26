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
The initial refactor is moving `entities[]` from the engine to the gameMap, including the function that renders them.  [Simple enough](https://github.com/mootootwo/2026rltutorial/commit/7077d405ef075696880d90c59ad4d148870badb3).

To patch up one of the many problems I left from [Part-4](https://mootootwo.github.io/2026rltutorial/part-4/devblog), I moved Field of View creation into the movement action processing so that it does not update every frame.  I also added a one-time FOV creation `main.js` so that the player can see things at the game start, before they first move.  This small patch is [here](https://github.com/mootootwo/2026rltutorial/commit/62c8277ceac3696fda9ea78ca00212a4fe8159ac).

Some interesting bits from the next step:
- The tutorial introduces default values for class constructors.  In JS, these will need `undefined` to be passed to the constructor, but I guess I will see what the tutorial has planned.
- We add a `spawn()` method to entities, so they can add themselves into the entity list and be placed on the map.  The tutorial uses something in Python called "deepcopy" for adding a clone of an object.

The tutorial has us using a deep copy (Python `copy.deepcopy()` which I replace with JS `structuredClone()` and `Object.setPrototypeOf()`) of instantiated "plain objects" or "literals".  I don't like the idea of defining data outside of my primary entrypoint in `main()` but, in the spirit of following the tutorial, I do it anyway.  This updated method of creating actors can be seen [here](https://github.com/mootootwo/2026rltutorial/commit/32142b491af97f46c6bbce0a47298a0c8e1ba556).

Letting us bump other entities seems straight forward, but first I need to [fix a problem with entity placement](https://github.com/mootootwo/2026rltutorial/commit/d140f4d252100f9c6f926a51c22dc31343ae1762) that allowed entities to be placed on overlapping tiles, and the total placed entities to exceed the max per room.  Then implementing the [check for blocking entities](https://github.com/mootootwo/2026rltutorial/commit/4741105172307c02cc215623eb8e9db4dc74d61a) is simple.

I am a little confused by the next steps in the tutorial where we enable interaction with other entities (attack actions, in the tutorial.)  It has "bump actions" as a child of "direction actions", and these "bump actions" then decide if the correct action is a move or attack.  I'm not sure why the tutorial goes through the extra step; should the decision not be made in the "direction action"?  

I really don't see what value the intermediary "bump action" adds, but I [implement it here](https://github.com/mootootwo/2026rltutorial/commit/d25c0f084577eb5ecf531dfcceb1754822ed2c4c).  I did have a bit of trouble getting my `#handleEvents()` loop to recognize second-level actions instanced by `BumpAction`, and the updated version of the game loop is based on a suggestion from a chatbot.

## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-5/demo.html)

---
#### Navigation:    [Part-4](https://mootootwo.github.io/2026rltutorial/part-4/devblog)    ←    [Index](https://mootootwo.github.io/2026rltutorial/readme)    →    [Part-6](https://mootootwo.github.io/2026rltutorial/part-6/devblog)
