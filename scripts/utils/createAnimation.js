import * as PIXI from "../pixi.min.mjs"

const createAnimation = async (img, w, h, framesNum, animSpeed = .16) => {
    const frameSize = 128
    const animFormat = {
        frames: {},
        meta: {
            image: img,
            format: 'RGBA8888',
            size: {w, h},
            scale: 1
        },
        animations: {
            animationRight: []
        }
    }

    for (let i = 0; i < framesNum; i++) {
        const name = `frame${i}`
        animFormat.frames[name] = {
            frame: {x: frameSize * i, y: 0, w: frameSize, h: frameSize},
            sourceSize: {w: frameSize, h: frameSize},
            spriteSourceSize: {x: 0, y: 0, w: frameSize, h: frameSize}
        }
        animFormat.animations.animationRight.push(name)
    }

    const spriteSheet = new PIXI.Spritesheet(
        PIXI.Texture.from(animFormat.meta.image),
        animFormat
    )
    await spriteSheet.parse()
    const anim = new PIXI.AnimatedSprite(spriteSheet.animations.animationRight)
    anim.animationSpeed = animSpeed

    return anim
}

export {
    createAnimation
}