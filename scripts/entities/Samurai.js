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


        // Animation
        this.sprite = null
    }

    #positionUpdate(anim) {
        anim.x = this.x
        anim.y = this.y
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
                break
        }

        this.#positionUpdate(this.sprite)
        this.sprite.play()
        app.stage.addChild(this.sprite)
    }


    async createSamurai() {
        this.sprite = await createAnimation('images/samurai/Idle_right.png', 768, 128, 6)
        this.#positionUpdate(this.sprite)
        this.sprite.zIndex = 2
        this.sprite.play()
        app.stage.addChild(this.sprite)
    }

    async updatePlayer() {
        await this.#setAnimation()
    }
}
