import * as PIXI from "./pixi.min.mjs"
import {appSize, app, entities} from "./utils/constants.js"
import {keys} from "./utils/keyboard.js"

export default class Game {
    constructor(player, container, gameInterface) {
        this.player = player
        this.container = container
        this.gameInterface = gameInterface
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

    #checkPlayerWalk() {
        // Right
        if (keys[68] && !keys[65]) {
            if (this.player.state !== 'walk') this.player.state = 'walk'
            if (!this.player.direction) this.player.direction = true
            this.player.x += this.player.params.speed
        }
        // Left
        if (keys[65] && !keys[68]) {
            if (this.player.state !== 'walk') this.player.state = 'walk'
            if (this.player.direction) this.player.direction = false
            this.player.x -= this.player.params.speed
        }
    }
    #checkPlayerRun() {
        // Run
        if (keys[16] && this.player.state !== 'run' && (keys[65] || keys[68])) {
            this.player.state = 'run'
            this.player.direction ?
                this.player.x += this.player.params.speed * 1.5 :
                this.player.x -= this.player.params.speed * 1.5
        }
    }
    #checkPlayerJump() {
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
    }
    #checkPlayerIdle() {
        if (!keys[68] && !keys[65] && this.player.state !== 'idle') this.player.state = 'idle'
    }

    // cameraMove() {
    //     const halfWidth = appSize.width / 2
    //     if (this.player.x >= halfWidth) {
    //         this.container.x = -halfWidth
    //     }
    // }

    async gameStart() {
        this.#addBackground()
        this.gameInterface.addInterface()
        await this.player.createPlayer()
    }
    async updateGame() {
        // Player
        this.player.oldDirection = this.player.direction
        this.player.oldState = this.player.state
        this.#checkPlayerWalk()
        this.#checkPlayerRun()
        this.#checkPlayerJump()
        this.#checkPlayerIdle()
        this.player.positionUpdate()
        await this.player.updatePlayer()


        // this.cameraMove()
    }
}