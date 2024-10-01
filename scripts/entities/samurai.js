import {createAnimation} from "../utils/createAnimation.js"
import {player, app} from "../utils/constants.js"

export default class Samurai {
    constructor() {
        this.idleRight = null
        this.idleLeft = null
    }

    async createIdleRight() {
        this.idleRight = await createAnimation('images/samurai/Idle_right.png', player.size * 6, player.size, 6)
        this.idleRight.zIndex = player.zIndex
        this.idleRight.y = player.y

        this.animPlay(this.idleRight)
    }

    animPlay(anim) {
        anim.play()
        app.stage.addChild(anim)
    }
}
