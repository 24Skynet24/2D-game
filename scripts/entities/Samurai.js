import {createAnimation} from "../utils/createAnimation.js"
import {entitiesParams, app} from "../utils/constants.js"

export default class Samurai {
    constructor() {
        this.params = entitiesParams
        this.status = {
            "RIGHT": true,
            "LEFT": false,
            "WALK": false,
            "RUN": false,
            "JUMP": false,
            "ATTACK": false,
            "DAMAGE": false,
            "DEATH": false,
            "FLY": false,
        }

        this.idleRight = null
        this.idleLeft = null
        this.walkRight = null
        this.walkLeft = null
    }

    // Animation Add / Remove / Create
    async #getAnim(img, frames) {
        const anim = await createAnimation(img, entitiesParams.size * frames, entitiesParams.size, frames)
        anim.y = this.params.y
        anim.x = this.params.x
        anim.zIndex = this.params.zIndex
        return anim
    }
    addAnim(anim) {
        app.stage.addChild(anim)
        anim.play()
    }
    removeAnim(anim){
        app.stage.removeChild(anim)
    }

    async createSamurai() {
        this.idleRight = await this.#getAnim('images/samurai/Idle_right.png', 6)
        this.walkRight = await this.#getAnim('images/samurai/Walk_right.png', 8)
        this.walkLeft = await this.#getAnim('images/samurai/Walk_left.png', 8)
        this.addAnim(this.idleRight)
    }

    async walk() {
        // if (this.status["RIGHT"]) {
        //     this.removeAnim(this.idleRight)
        //     this.removeAnim(this.walkLeft)
        //     this.addAnim(this.walkRight)
        // }
        // else if (this.status["LEFT"]) {
        //     this.removeAnim(this.idleRight)
        //     this.removeAnim(this.walkRight)
        //     this.addAnim(this.walkLeft)
        // }
        // else {
        //     this.removeAnim(this.walkLeft)
        //     this.removeAnim(this.walkRight)
        //     this.addAnim(this.idleRight)
        // }
    }
}
