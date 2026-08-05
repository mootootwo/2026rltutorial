# r/roguelikedev Roguelike Tutorial 2026
Native Javascript, no third party libraries

##  Part-0
Part-0 of the [tutorial](https://rogueliketutorials.com/tutorials/tcod/v2/part-0/) sets up the development environment and downloads dependencies.

I am not installing Python or the libtcod dependencies.  This project will be entirely in native JS without any external libraries.  In any places where the tutorial calls for a library function (e.g., screen rendering, map generation, pathfinding) I will be writing my own rudimentary replacement.

To setup my environment, I have:
- Installed Antigravity IDE (added the Google repo to my repo list and installed via apt)
- Configured Git (username and github anonymised  email)
- Setup a new repo and initial commit
- Installed Busybox as a local webserver

Instead of using a tilesheet as described in the tutorial, I will be using a font and drawing text on canvas.  I know from prior experience that this is extremely inefficient and also leads to uncontrolable rendering issues (for example, antialiasing that can not be disabled on all browsers) -- but it will be fine for this tutorial.

The [last](https://github.com/mootootwo/lox) time I attempted this tutorial, I placed each part of the tutorial into its own subdirectory.  This time, I will attempt to preserve each part of the tutorial with a release and tag. 

### Language
Javascript, currently V8 15.0.1240245

### Editor
Google Antigravity

I am normally a Windows desktop user, with some linux server background at work.  Earlier this year, I migrated my antiquated laptop to a Debian distro called MX Linux, and I am experimenting with Linux based workflows -- though still largely through the graphical desktop environment rather than pure CLI.

To this end, I have replaced VSC with Antigravity.  I have disabled all of the AI features (including tab-complete, because it kept trying to write these markdowns for me).  With that in mind, it is functionally equivilant to VSC, as far as I can tell.

### Local Enviornment
Google Chrome 150.0.7871.128 (Official Build) (64-bit)

My local development sandbox runs on a Busybox server, hosting flat files

### Code Repository
[Github](https://github.com/mootootwo/2026rltutorial)

### Hosting
[GitPages](https://mootootwo.github.io/2026rltutorial/)
