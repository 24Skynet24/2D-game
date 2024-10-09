import * as PIXI from "./pixi.min.mjs"
import {appSize, app, entities} from "./utils/constants.js"
import {keys, setKey} from "./utils/keyboard.js"

export default class Game {
    constructor(player, container) {
        this.player = player
        this.container = container
        this.playerSpeed = 2
    }

    #addBackground() {
        const background = PIXI.Sprite.from('images/backgrounds/background1.png')
        const floor = PIXI.Sprite.from( 'images/objects/floor.png')
        const trees = PIXI.Sprite.from('images/objects/trees.png')

        app.stage.addChild(background, this.container)

        floor.y = appSize.height - 64
        trees.y = appSize.height - 64 - 322

        this.container.addChild(floor, trees)
    }

    // cameraMove() {
    //     const halfWidth = appSize.width / 2
    //     if (this.player.x >= halfWidth) {
    //         this.container.x = -halfWidth
    //     }
    // }

    async createGame() {
        this.#addBackground()
        await this.player.createPlayer()
    }

    async updateGame() {
        this.player.oldDirection = this.player.direction
        this.player.oldState = this.player.state

        // Right
        if (keys[68] && !keys[65]) {
            if (this.player.state !== 'walk') this.player.state = 'walk'
            if (!this.player.direction) this.player.direction = true
            this.player.x += this.playerSpeed
        }
        // Left
        if (keys[65] && !keys[68]) {
            if (this.player.state !== 'walk') this.player.state = 'walk'
            if (this.player.direction) this.player.direction = false
            this.player.x -= this.playerSpeed
        }
        // Run
        if (keys[16] && this.player.state !== 'run' && (keys[65] || keys[68])) {
            this.player.state = 'run'
            this.player.direction ? this.player.x += this.playerSpeed * 1.5 : this.player.x -= this.playerSpeed * 1.5
        }
        // Jump
        if (this.player.isJump) {
            this.player.y += this.player.verticalSpeed
            this.player.verticalSpeed += this.player.gravity

            if (this.player.y >= entities.posY) {
                this.player.y = entities.posY
                this.player.isJump = false
                this.player.verticalSpeed = 0
            }
        }
        // Idle
        if (!keys[68] && !keys[65] && this.player.state !== 'idle') this.player.state = 'idle'

        this.player.positionUpdate()
        await this.player.updatePlayer()


        // this.cameraMove()
    }
}