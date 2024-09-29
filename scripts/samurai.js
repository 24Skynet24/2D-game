const samurai = async () => {
    const player = {
        y: appSize.height - 48 - 128,
        zIndex: 2,
        size: 128,
    }

    const samuraiIdle = await createAnimation('images/samurai/Idle_right.png', player.size * 6, player.size, 6)
    samuraiIdle.zIndex = player.zIndex
    samuraiIdle.y = player.y
    samuraiIdle.play()

    app.stage.addChild(samuraiIdle)
}
