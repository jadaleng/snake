function draw_snake () {
    fill_screen_with_color(100, 0, 100)
    display.setMatrixColor(snake_x, snake_y, GAME_ZIP64.colors(ZipLedColors.Violet))
}
function fill_screen_with_color (red: number, green: number, blue: number) {
    for (let x = 0; x <= 8; x++) {
        for (let y = 0; y <= 8; y++) {
            display.setMatrixColor(x, y, GAME_ZIP64.rgb(red, green, blue))
        }
    }
}
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Right, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    snake_x += 1
    draw_snake()
})
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Left, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    snake_x += -1
    draw_snake()
})
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Up, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    snake_y += -1
    draw_snake()
})
GAME_ZIP64.onButtonPress(GAME_ZIP64.ZIP64ButtonPins.Down, GAME_ZIP64.ZIP64ButtonEvents.Down, function () {
    snake_y += 1
    draw_snake()
})
let snake_y = 0
let snake_x = 0
let display: GAME_ZIP64.ZIP64Display = null
display = GAME_ZIP64.createZIP64Display()
snake_x = 4
snake_y = 5
draw_snake()
