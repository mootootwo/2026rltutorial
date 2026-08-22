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

According to the tutorial, this next bit would be a great place to learn how iterator or "yield" functions work.  I didn't do that, and I didn't implement Bresenham Lines.  With that in mind, here is my attempt at [creating a path between rooms]().  I did add a new tile type for the paths, I imagined these would be like paving stones between buildings.

[multiple rooms with random size and location]()



## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-3/demo.html)

---
#### Navigation:    [Part-2](https://mootootwo.github.io/2026rltutorial/part-2/devblog)    ←    [Index](https://mootootwo.github.io/2026rltutorial/readme)    →    [Part-4](https://mootootwo.github.io/2026rltutorial/part-4/devblog)
