const assetsLoad = async () => {
    await PIXI.Assets.load([
        // Backgrounds
        'images/backgrounds/background1.png',

        // Objects
        'images/objects/floor.png',
        'images/objects/trees.png',

        // Samurai
        'images/samurai/Idle.png',
        'images/samurai/Walk.png',
    ])
}

