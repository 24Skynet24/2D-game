import {createAnimation} from "../utils/createAnimation.js"
import {player, app} from "../utils/constants.js"

export default class Samurai {
    constructor() {
        this.x = player.x
        this.y = player.y

        this.idleRight = null
        this.idleLeft = null
        this.walkRight = null
        this.runRight = null
    }

    async animation(img, frames) {
        const anim = await createAnimation(img, player.size * frames, player.size, frames)
        anim.y = this.y
        anim.x = this.x
        anim.zIndex = player.zIndex
        return anim
    }

    // Add / Remove Animation
    animPlay(anim) {
        anim.play()
        app.stage.addChild(anim)
    }
    removeAnim(anim){
        app.stage.removeChild(anim)
    }

    setPosition(x, y){
        if (x) this.x += x
        if (y) this.y += y

        this.idleRight.x = this.x
        this.walkRight.x = this.x
        this.runRight.x = this.x

        this.idleRight.y = this.y
        this.walkRight.y = this.y
        this.runRight.y = this.y
    }

    async createSamurai() {
        // Create all animations
        this.idleRight = await this.animation('images/samurai/Idle_right.png', 6)
        this.walkRight = await this.animation('images/samurai/Walk_right.png', 9)
        this.runRight = await this.animation('images/samurai/Run_right.png', 8)

        this.animPlay(this.idleRight)
    }
}
