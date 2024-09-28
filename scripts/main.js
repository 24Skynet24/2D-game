const appSize = {
    width: 1280,
    height: 720,
}


const app = new PIXI.Application()
const initApp = async () => {
    await app.init({
        width: appSize.width,
        height: appSize.height,
    })
    document.body.appendChild(app.view)
}
