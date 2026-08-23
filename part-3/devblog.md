# r/roguelikedev Roguelike Tutorial 2026
Native Javascript, no third party libraries

##  Part-3
Part-3 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-3/) is about "Generating the Dungeon".  

### Steps
- remove the test wall from part-2
- create a generator for a rectangular room
    - find the center
    - return inner slices (Python slices are not array slices!!)
- add generator to main
- create tunnel between rooms
    - implement a random function
    - implement Bresenham Lines (or design a replacement)
    - design a replacement for Python `yield` functions
- check for room intersection
- randomize room size between min and max values
- keep list of rooms
- place `player` intelligently in a room


### How it went
First, a confession:  I do not like Rogue's dungeon layout.  I don't like the 1970s and 80s style D&D dungeon maps that influenced it, either.  So, I won't be carving hollow rooms out to generate this map.  I am still following the tutorial closely, but I will instead create rectangular buildings and connect them with open-air paths.  It is, by most measures, identical.

Setting up the rectangular room generator isn't hard, but there are a few things I don't understand from looking at the Python.  It appears to be taking slices of an array, but I don't see where the array is created.  I assume that I need to create arrays of tiles to represent the rooms, and [maetl](https://github.com/maetl/roguelike-tutorial/commit/78a199e4cdbe9d14cb47fc9d6853563f1ea0ce0d) carries me through with a good example on how to do it.

Some time later, I learn that the Pythond `slice()` function is not the same as an array `.slice` method, at all.

This is my implementation of [creating two rooms](https://github.com/mootootwo/2026rltutorial/commit/7c80e93025d8cd88cd4964b2ab7bf5d79248f227).

According to the tutorial, this next bit would be a great place to learn how generator or "yield" functions work.  I didn't do that, and I didn't implement Bresenham Lines.  I did add a new tile type for the paths, I imagined these would be like paving stones between buildings.  

Refreshing the page at this point will have the path alternate between horizontal-first and vertical-first path drawing, as the tutorial intended.  I offset the test rooms so this would be visible, unlike in the tutorial example.  This is my attempt at [creating a path between rooms](https://github.com/mootootwo/2026rltutorial/commit/8ec9ce9187161b8b9ab49f273850e9567401b517).  

The final step of Part-3 is to rewrite the level generator to randomize room size, quantity, and position.  I need to create a new `randomRange()` function in `utility.js` as there is no native way in JS to generate a number in a specific interger range, and I am able to follow the tutorial mostly as designed.

There are two minor differences in my approach:  First, I continue using the sub-functions I created previously to place rooms and path between them, instead of rewriting them into a more monolithic block.  Second, I create the array of rooms before performing operations on it (e.g., placing them, pathing between them, and locating the player).

I think the tutorial's approach is probably more performant, as it reduces the number of times the array needs to be accessed.  But I am able to more easily read and follow the code when each step is separate.

The final change in my implementation of [multiple rooms with random size and location]() is cosmetic: I connect the first and last rooms to each other with paths, instead of leaving them as stubs.

## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-3/demo.html)

---
#### Navigation:    [Part-2](https://mootootwo.github.io/2026rltutorial/part-2/devblog)    ←    [Index](https://mootootwo.github.io/2026rltutorial/readme)    →    [Part-4](https://mootootwo.github.io/2026rltutorial/part-4/devblog)
