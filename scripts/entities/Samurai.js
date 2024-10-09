import * as PIXI from "../pixi.min.mjs"
import {createAnimation} from "../utils/createAnimation.js"
import {app} from "../utils/constants.js"

export default class Samurai {
    constructor(x, y, container) {
        this.container = container

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

        this.isAttacking = false

        // Animation
        this.sprite = null
    }


    #animStart() {
        this.positionUpdate()
        this.sprite.play()
        this.container.addChild(this.sprite)
    }
    #attackEnd(oldSprite) {
        setTimeout(() => {
            this.container.removeChild(this.sprite)
            this.isAttacking = false
            this.sprite = oldSprite
            this.#animStart()
        }, 400)
    }
    async #setAnimation() {
        switch (this.state) {
            case 'walk':
                if (this.oldState === 'walk' && this.oldDirection === this.direction) return
                this.container.removeChild(this.sprite)
                if (this.direction) this.sprite = await createAnimation('images/samurai/Walk_right.png', 1152, 128, 9)
                else this.sprite = await createAnimation('images/samurai/Walk_left.png', 1152, 128, 9)
                break

            case 'idle':
                if (this.oldState === 'idle') return
                this.container.removeChild(this.sprite)
                if (this.direction) this.sprite = await createAnimation('images/samurai/Idle_right.png', 768, 128, 6)
                else this.sprite = await createAnimation('images/samurai/Idle_left.png', 768, 128, 6)
                break
            case 'run':
                if (this.oldState === 'run') return
                this.container.removeChild(this.sprite)
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
    async attack() {
        if (!this.isAttacking) {
            const oldSprite = this.sprite
            this.isAttacking = true
            this.container.removeChild(this.sprite)
            if (this.direction) this.sprite = await createAnimation('images/samurai/Attack_3_right.png', 512, 128, 4, .15)
            else this.sprite = await createAnimation('images/samurai/Attack_3_left.png', 512, 128, 4, .15)
            this.#animStart()
            this.#attackEnd(oldSprite)
        }
    }


    async createPlayer() {
        this.sprite = await createAnimation('images/samurai/Idle_right.png', 768, 128, 6)
        this.positionUpdate()
        this.sprite.zIndex = 2
        this.sprite.play()
        this.container.addChild(this.sprite)
    }

    async updatePlayer() {
        await this.#setAnimation()
    }
}
