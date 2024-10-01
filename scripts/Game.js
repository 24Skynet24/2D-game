import * as PIXI from "./pixi.min.mjs"
import {appSize, app} from "./utils/constants.js"
import {keys, setKey} from "./utils/keyboard.js"

export default class Game {
    constructor(player) {
        this.player = player
    }

    #addBackground() {
        const background = PIXI.Sprite.from('images/backgrounds/background1.png')
        const floor = PIXI.Sprite.from( 'images/objects/floor.png')
        const trees = PIXI.Sprite.from('images/objects/trees.png')

        floor.y = appSize.height - 64
        trees.y = appSize.height - 64 - 322

        app.stage.addChild(background, floor, trees)
    }

    async createGame() {
        this.#addBackground()
        await this.player.createSamurai()
    }

    async updateGame() {

        if (keys[68]) {
            this.player.status["LEFT"] = false
            this.player.status["RIGHT"] = true
            await this.player.walk()
        }
        if (keys[65]) {
            this.player.status["RIGHT"] = false
            this.player.status["LEFT"] = true
            await this.player.walk()
        }
        this.player.status["RUN"] = keys[16]
    }
}