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
        this.player.oldDirection = this.player.direction
        this.player.oldState = this.player.state

        // Right
        if (keys[68] && !keys[65]) {
            if (this.player.state !== 'walk') this.player.state = 'walk'
            if (!this.player.direction) this.player.direction = true
            this.player.x += 1
        }
        // Left
        if (keys[65] && !keys[68]) {
            if (this.player.state !== 'walk') this.player.state = 'walk'
            if (this.player.direction) this.player.direction = false
            this.player.x -= 1
        }
        // Run
        if (keys[16] && this.player.state !== 'run' && (keys[65] || keys[68])) {
            this.player.state = 'run'
            this.player.direction ? this.player.x += 2 : this.player.x -= 2
        }
        // Idle
        if (!keys[68] && !keys[65]) {
            if (this.player.state !== 'idle') this.player.state = 'idle'
        }

        this.player.positionUpdate()
        await this.player.updatePlayer()
    }
}