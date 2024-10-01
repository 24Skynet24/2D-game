import * as PIXI from "../pixi.min.mjs"

export default async () => {
    await PIXI.Assets.load([
        // Backgrounds
        'images/backgrounds/background1.png',

        // Objects
        'images/objects/floor.png',
        'images/objects/trees.png',

        // Samurai
        'images/samurai/Idle_right.png',
        'images/samurai/Walk_right.png',
    ])
}

