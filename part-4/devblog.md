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

I think I must have misunderstood something in Part-1, because I was already sending graphics information for light and dark tiles to the `Tile` class constructor.  I cleaned this up to present it in the way the tutorial requests, here in Part-4.  I am still keeping the data for instantiating the tile types in `main()` because -- in my imagination -- I am maintaining some separation of data and logic.  I'm not sure if this is happening in reality.

I don't have `npselect()` so I just iterate though the arrays and compare the grid of tiles to the visible and explored 2d arrays.

It is all working in [this commit](https://github.com/mootootwo/2026rltutorial/commit/88c580af9d8fe3e06f7e8e50ce7d1a246d1d29eb), where I have a placeholder graphic for `shroud` to make it visually recognizeable, and the `visible[]` and `explored[]` arrays can be toggled to true or false when they are instantiated so that each display type can be verified.

The final step in Part-4 is "just" to implement a field-of-view algorithm.  I had a lot of problems so, in the process of troubleshooting, I [updated error logging]() and (as a side benefit) finally made `EscapeAction.perform()` return out of the game loop.

When I [fooled around with this in 2022](https://github.com/mootootwo/lox/blob/84270d95bb1d1b81d2da11ceed4c2d20f08c15f2/part-4/js/entity.js#L45) I did a bad job of understanding this popular [Bob Nystrom Article](https://journal.stuffwithstuff.com/2015/09/07/what-the-hero-sees/).  This time, I am just taking a [page from maetl](https://github.com/maetl/roguelike-tutorial/blob/master/docs/tutorial/part-4.md) and basically just [yoinking his implementation](https://github.com/maetl/roguelike-tutorial/blob/bb81d89e6ee820f1b6772454246d9968113f66f7/src/fov.js).  

I adapted it slightly to use arrays instead of sets.  I put the FOV update call in the game loop, which triggers each rendering frame rather than on action updates.  This isn't as efficient, but I had a lot of race-condition problems when I had the call happening only after a sucessful movement action.

This is a very problematic implementation.  I have wrapped it in a try/catch so that I can continue with further steps in the tutorial.  I think that I currently have a combination of structural and performance problems, and they compound each other:

Structural issues:
- Font loading is done with an XHR call and is poorly serialized.  The game starts running before external assets are finished loading
- Input handling is whenever the window.keydown listener feels like setting a variable. There is no real event queue, an no blocking
- This shadow caster seems to be "not very good".  It frequntly sees through walls or has problems with corners and problems at the edges of its octants
- I am calling for FOV updates per frame, which is bad for the reasons described above

Performance issues:
- maetl uses a `set` data structure for visibility, while I use multiple 2D arrays.  I may be slowing things down such that FOV isn't able to update between frames
- draw calls for text on canvas are stupidly slow, and other requests may be tripping over each other while the canvas tries to draw its self

The problems I faced included actions being repeated (e.g. multiple move actions) when attempting to process FOV per action.  Halting errors from FOV updates, requiring me to improve my try/catch error handling (and continuing).  And, the most visible remaining one, the FOV algorithm seeing through opaque tiles (at certain ranges and angles) and interpreting vision range differently when on different parts of the map.

I think it is stable enough to continue, so this is the [final commit of Part-4]().

## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-4/demo.html)

---
#### Navigation:    [Part-3](https://mootootwo.github.io/2026rltutorial/part-3/devblog)    ←    [Index](https://mootootwo.github.io/2026rltutorial/readme)    →    [Part-5](https://mootootwo.github.io/2026rltutorial/part-5/devblog)
