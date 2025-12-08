const spriteData = {
  en: { 
	"bg_preload": "sprites/bg_preload.png",
	"bg_preload_2": "sprites/bg_preload_2.png",
	"preload_play": "sprites/misc/preload_play.json"
 },
 bn: { 
   "bg_preload": "bn/sprites/bg_preload.png",
   "bg_preload_2": "sprites/bg_preload_2.png",
   "preload_play": "bn/sprites/misc/preload_play.json"
}
};


/// handles diff language spriteData
// fallback on en if something is missing
class SpriteManager {
  constructor() {
    this.language = "en";
  }

  setLanguage(code) {
    this.language = spriteData[code] ? code : "en";
  }

  getSprite(key) {
    const lang = this.language;

    const path = spriteData[lang]?.[key];
    if (path) return path;

    const fallback = spriteData.en[key];
    return fallback ?? null;
  }
}

export const spriteManager = new SpriteManager();

export const Sprites = new Proxy({}, {
  get(_, prop) {
    return spriteManager.getSprite(prop);
  }
});

/// To use it 
// import { spriteManager, Sprites } from "./sprites.js";
//
// spriteManager.setLanguage("bn");
//
// console.log(Sprites.x);  // assets/bn/x.png
