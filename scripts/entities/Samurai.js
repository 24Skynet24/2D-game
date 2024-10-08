import * as PIXI from "../pixi.min.mjs"
import {createAnimation} from "../utils/createAnimation.js"
import {app} from "../utils/constants.js"

export default class Samurai {
    constructor(x, y) {
        this.x = x
        this.y = y

        // Statuses
        this.oldState = null
        this.state = 'idle'  // idle, walk, run
        this.oldDirection = true
        this.direction = true  // right - true, left - false
        this.isJump = false

        this.verticalSpeed = 0
        this.gravity = 0.5
        this.jumpSpeed = -10


        // Animation
        this.sprite = null
    }


    #animStart() {
        this.positionUpdate()
        this.sprite.play()
        app.stage.addChild(this.sprite)
    }
    async #setAnimation() {
        switch (this.state) {
            case 'walk':
                if (this.oldState === 'walk' && this.oldDirection === this.direction) return
                app.stage.removeChild(this.sprite)
                if (this.direction) this.sprite = await createAnimation('images/samurai/Walk_right.png', 1152, 128, 9)
                else this.sprite = await createAnimation('images/samurai/Walk_left.png', 1152, 128, 9)
                break

            case 'idle':
                if (this.oldState === 'idle') return
                app.stage.removeChild(this.sprite)
                if (this.direction) this.sprite = await createAnimation('images/samurai/Idle_right.png', 768, 128, 6)
                else this.sprite = await createAnimation('images/samurai/Idle_left.png', 768, 128, 6)
                break
            case 'run':
                if (this.oldState === 'run') return
                app.stage.removeChild(this.sprite)
                if (this.direction) this.sprite = await createAnimation('images/samurai/Run_right.png', 1024, 128, 8)
                else this.sprite = await createAnimation('images/samurai/Run_left.png', 1024, 128, 8)
                break
        }
        this.#animStart()
    }


    positionUpdate() {
        this.sprite.x = this.x
        this.sprite.y = this.y
    }

    jump() {
        if (!this.isJump) {
            this.isJump = true
            this.verticalSpeed = this.jumpSpeed
        }
    }


    async createPlayer() {
        this.sprite = await createAnimation('images/samurai/Idle_right.png', 768, 128, 6)
        this.positionUpdate()
        this.sprite.zIndex = 2
        this.sprite.play()
        app.stage.addChild(this.sprite)
    }

    async updatePlayer() {
        await this.#setAnimation()
    }
}
