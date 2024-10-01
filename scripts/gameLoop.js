import * as PIXI from './pixi.min.mjs'
import {app} from "./utils/constants.js"
import {keys} from "./utils/keys.js"

export default async (player) => {
    app.ticker.add(e => {
        if (keys[68]) {
            player.removeAnim(player.idleRight)
            player.removeAnim(player.runRight)
            player.animPlay(player.walkRight)
            player.setPosition(1)
        }
        if (keys[68] && keys[16]) {
            player.removeAnim(player.idleRight)
            player.removeAnim(player.walkRight)
            player.animPlay(player.runRight)
            player.setPosition(2)
        }
        if (!keys[68]) {
            player.removeAnim(player.walkRight)
            player.removeAnim(player.runRight)
            player.animPlay(player.idleRight)
        }
    })
}