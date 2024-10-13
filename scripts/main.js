import * as PIXI from "./pixi.min.mjs"
import assetsLoad from "./utils/assetsLoad.js"
import {appSize, app, entities} from "./utils/constants.js"
import {setKey} from "./utils/keyboard.js"
import GameFactory from "./GameFactory.js"

window.addEventListener("load", async () => {
    await app.init({
        width: appSize.width,
        height: appSize.height,
    })

    await assetsLoad()

    const gameFactory = new GameFactory()

    const gameInterface = gameFactory.createInterface()
    const gameContainer = gameFactory.createContainer()
    const player = gameFactory.createPlayer(gameContainer, gameInterface)
    const game = gameFactory.createGame(player, gameContainer, gameInterface)
    await game.gameStart()

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