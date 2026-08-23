# r/roguelikedev Roguelike Tutorial 2026
Native Javascript, no third party libraries

##  Part-4
Part-4 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-4/) is about "Field of view".  

### Steps
- create arrays to track tile
    - visible
    - explored
- add "light" property to tiles?? why? they already have character and colour.
- create tile type for unexplored / fog-of-war areas
- update the map drawer to check against the visible and explored arrays before chosing the glyph (char&color) to draw
- write an FoV algorithim equivilant to tcod `compute_fov`
- update the visible part of the map, based on player fov

### How it went
During Part-2, I diverged from the tutorial and did not place a `render()` function inside the `GameMap` class.  I kept this in the `Engine` class to avoid passing the canvas rendering context (`ctx`) to the map.  I [changed this and cleaned up some other kruft](https://github.com/mootootwo/2026rltutorial/commit/d71094d4a75e6f0d54f9ff7671473a3e9aefd068) as my first commit, to be more in line with the tutorial's expectations.

Then I became upset because the map draws its self but entities do not.  This matches the tutorial behaviour, so I am leaving it alone for now.

Adding the arrays to track "visible" and "explored" status was simple enough.  I adapted the `generateMap()` that creates a 2D array of floor tiles, to also create 2D arrays containg the value "false".  

I am tempted to track this information as properties of the cells on the map -- but it may be more efficient to constrain this to boolean values.  Of course, it isn't, because this is Javascript.  I could go through some gymnastics to use a [bit array](https://github.com/swiing/Bit-TypedArray), or I could use a byte-array with the "new" `Unit8Array` types.  For now though, I just [get on with it](https://github.com/mootootwo/2026rltutorial/commit/5b122c44cba0c959d67bb052ab6b91b2c7d37c1e).



## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-4/demo.html)

---
#### Navigation:    [Part-3](https://mootootwo.github.io/2026rltutorial/part-3/devblog)    ←    [Index](https://mootootwo.github.io/2026rltutorial/readme)    →    [Part-5](https://mootootwo.github.io/2026rltutorial/part-5/devblog)
