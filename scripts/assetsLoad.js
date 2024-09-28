const assetsLoad = async () => {
    await PIXI.Assets.load([
        'images/backgrounds/background1.png',
        'images/objects/floor.png',
        'images/objects/trees.png',
    ])
}

