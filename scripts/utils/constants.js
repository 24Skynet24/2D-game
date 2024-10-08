import * as PIXI from "../pixi.min.mjs"

const app = new PIXI.Application()

const appSize = {
    width: 1280,
    height: 720,
}

const entities = {
    posY: appSize.height - 48 - 128
}

export {
    app,
    appSize, entities
}