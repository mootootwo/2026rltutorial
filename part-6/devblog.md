# r/roguelikedev Roguelike Tutorial 2026
Native Javascript, no third party libraries

##  Part-6
Part-6 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-6/) is about "Doing and taking damage".  As per [Part-5](https://mootootwo.github.io/2026rltutorial/part-5/devblog) I am still feeling non-violent.  I will follow the tutorial closely, but will make some cosmetic changes so that no one gets hurt.

Part-6 also starts with a large refactor.

### Steps
- Refactor
    - move handle events method to event handler from engine
    - game map to have reference to engine
    - entities to have reference to map
    - actions initialised with entity doing the action
    - actions can reference engine through entity -> map -> engine
- Create components
    - base component
    - fighter
    - hitpoint property
    - getters and setters
- Create AI (replacing `tcod.path.SimpleGraph` and `.Pathfinder`)
- Attach AI and fighter components to entities
- Write class for AI users with conditional behaviour
    - wait while out of LOS
    - attack when adjacent
    - path to player when in LOS
- Implement a "wait" action
- Refactor entity factories
- Add entity AI processing to game loop where the part-5 placeholder was
- Add an "actors" set to the game map
- Refactor input handler
    - add support for multiple keybinds
    - add support for diagonal movement
- add damage calculation to the melee action
    - attack vs defense damage calc
    - identify target of action
- add death routine to hp setter
- implement render order for entities
    - update render method on game map to respect render order
    - update the render order of fighters on death
- create HP display for player
- Separate event handler into two child handlers
    - main game event handler
    - game over event handler (for when player dies)
- Put new event handler in engine
- Use the figher component to swap to the game over event handler on death

### How it went
The first thing I do is [fix the typo](https://github.com/mootootwo/2026rltutorial/commit/fd010037cb9e2954d7df21b4e27d50c3cfd407c9) that was breaking the shadowcasting implementation.

During the refactor, I'm unhappy about a couple of things.  First, that I still don't have a proper event or action queue and I need to work around that not existing.  Next that all of the other JS Roguelike Tutorial projects I have been referencing are solidly doing their own thing at this point, and I have no hints from them about this refactor.

The part of the refactor that I couldn't translate into this project, was moving the event handler out of `Engine` and into `main()`.  So the `#handleEvents()` private method and the FOV refresh are still in the engine.  It took a lot of troubleshooting to iron out the problems, but this is the [complete refactor]().


## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-6/demo.html)

---
#### Navigation:    [Part-5](https://mootootwo.github.io/2026rltutorial/part-5/devblog)    ←    [Index](https://mootootwo.github.io/2026rltutorial/readme)    →    [Part-7](https://mootootwo.github.io/2026rltutorial/part-7/devblog)
