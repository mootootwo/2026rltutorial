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
derp.

## Demo
[GitPages](https://mootootwo.github.io/2026rltutorial/part-4/demo.html)

---
#### Navigation:    [Part-3](https://mootootwo.github.io/2026rltutorial/part-3/devblog)    ←    [Index](https://mootootwo.github.io/2026rltutorial/readme)    →    [Part-5](https://mootootwo.github.io/2026rltutorial/part-5/devblog)
