import * as PIXI from "./pixi.min.mjs"
import assetsLoad from "./utils/assetsLoad.js"
import {appSize, app} from "./utils/constants.js"
import {setKey} from "./utils/keyboard.js"
import Game from "./Game.js"
import Samurai from "./entities/Samurai.js"


window.addEventListener("load", async () => {
    await app.init({
        width: appSize.width,
        height: appSize.height,
    })

    await assetsLoad()

    const player = new Samurai(0, appSize.height - 48 - 128)
    const game = new Game(player)
    await game.createGame()

    document.addEventListener('keydown', e => setKey(e.keyCode))
    document.addEventListener('keyup', e => setKey(e.keyCode, false))

    document.body.appendChild(app.view)

    app.ticker.add(await game.updateGame, game)
})