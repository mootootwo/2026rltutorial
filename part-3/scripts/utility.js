/*
Some utility functions
*/

export { randomRange };

// generates a random number between a given min and max
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}