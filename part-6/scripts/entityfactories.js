/* 
entity factories 
These guys are the sources for deepcopy actions
and will be used to spawn entities in the game
*/

import { Actor } from "./entities.js";

export { player, bigU, lilU };

// these are the templates for entities that will be copied
// TODO: it might be possible to pass named paramater values here
// instead of explicitly calling "undefined" in the strict paramater order?
const player = new Actor(undefined, undefined, undefined, "@", "#ffffff", "Player", true);
const bigU = new Actor(undefined, undefined, undefined, "Ü", "#ff00ee", "Big Ü", true);
const lilU = new Actor(undefined, undefined, undefined, "ü", "#cc66ff", "Lil ü", true);
