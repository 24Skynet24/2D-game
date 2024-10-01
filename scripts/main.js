import * as PIXI from "./pixi.min.mjs"
import assetsLoad from "./utils/assetsLoad.js"
import {appSize, app} from "./utils/constants.js"
import Samurai from "./entities/samurai.js"


window.addEventListener("load", async () => {
    await app.init({
        width: appSize.width,
        height: appSize.height,
    })
    document.body.appendChild(app.view)

    await assetsLoad()

    const background = PIXI.Sprite.from('images/backgrounds/background1.png')
    const floor = PIXI.Sprite.from( 'images/objects/floor.png')
    const trees = PIXI.Sprite.from('images/objects/trees.png')

    floor.y = appSize.height - 64
    trees.y = appSize.height - 64 - 322

    const player = new Samurai()
    await player.createIdleRight()

    app.stage.addChild(
        background,
        floor,
        trees,
    )
})