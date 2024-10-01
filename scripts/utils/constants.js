import * as PIXI from "../pixi.min.mjs"

const app = new PIXI.Application()

const appSize = {
    width: 1280,
    height: 720,
}

const player = {
    y: appSize.height - 48 - 128,
    zIndex: 2,
    size: 128,
}

export {
    app,
    appSize,
    player,
}