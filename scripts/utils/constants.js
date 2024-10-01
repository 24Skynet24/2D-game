import * as PIXI from "../pixi.min.mjs"

const app = new PIXI.Application()

const appSize = {
    width: 1280,
    height: 720,
}

const entitiesParams = {
    x: 0,
    y: appSize.height - 48 - 128,
    zIndex: 2,
    size: 128,
    speed: 1,
}

export {
    app,
    appSize,
    entitiesParams,
}