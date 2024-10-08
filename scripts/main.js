import * as PIXI from "./pixi.min.mjs"
import assetsLoad from "./utils/assetsLoad.js"
import {appSize, app, entities} from "./utils/constants.js"
import {setKey} from "./utils/keyboard.js"
import Game from "./Game.js"
import Samurai from "./entities/Samurai.js"


window.addEventListener("load", async () => {
    await app.init({
        width: appSize.width,
        height: appSize.height,
    })

    await assetsLoad()

    const gameContainer = new PIXI.Container()
    const player = new Samurai(0, entities.posY, gameContainer)
    const game = new Game(player, gameContainer)
    await game.createGame()

    app.view.addEventListener('click', async () => await player.attack())
    document.addEventListener('keydown', e => {
        setKey(e.keyCode)
        if (e.code === 'Space') player.jump()
    })
    document.addEventListener('keyup', e => setKey(e.keyCode, false))

    app.view.style.cursor = 'none'
    document.body.appendChild(app.view)

    app.ticker.add(await game.updateGame, game)
})