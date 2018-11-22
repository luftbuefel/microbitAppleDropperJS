let minimumAppleMoveTime = 0
let appleMoveTime = 0
let apple: game.LedSprite = null
let lastCheckedTime = 0
let player: game.LedSprite = null
function resetApple() {
    apple.set(LedSpriteProperty.X, Math.randomRange(0, 4))
    apple.set(LedSpriteProperty.Y, 0)
}
input.onButtonPressed(Button.B, function () {
    player.change(LedSpriteProperty.X, 1)
})
input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.X, -1)
})
player = game.createSprite(2, 4)
lastCheckedTime = input.runningTime()
appleMoveTime = 800
apple = game.createSprite(Math.randomRange(0, 4), 0)
minimumAppleMoveTime = 300
basic.forever(function () {
    if (input.runningTime() - lastCheckedTime >= appleMoveTime) {
        apple.change(LedSpriteProperty.Y, 1)
        lastCheckedTime = input.runningTime()
    }
    if (apple.get(LedSpriteProperty.Y) == 4) {
        if (player.isTouching(apple)) {
            game.addScore(1)
            music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
            resetApple()
            if (appleMoveTime > minimumAppleMoveTime) {
                appleMoveTime += -25
            }
        } else {
            game.gameOver()
        }
    }
})
