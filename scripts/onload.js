window.addEventListener("load", async () => {
    await initApp()
    await assetsLoad()

    const background = PIXI.Sprite.from('images/backgrounds/background1.png')
    const floor = PIXI.Sprite.from( 'images/objects/floor.png')
    const trees = PIXI.Sprite.from('images/objects/trees.png')

    floor.y = appSize.height - 64
    trees.y = appSize.height - 64 - 322

    app.stage.addChild(
        background,
        floor,
        trees,
    )
})