let bg_red = 0;
let bg_green = 0;
let bg_blue = 0;

function hueToBgRgb(hue: number) {
    function hue2rgb(t: number) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return 6 * t;
        if (t < 1 / 2) return 1;
        if (t < 2 / 3) return (2 / 3 - t) * 6;
        return 1;
    }

    bg_red = hue2rgb(hue + 1 / 3) * 255;
    bg_green = hue2rgb(hue);
    bg_blue = hue2rgb(hue - 1 / 3);
}

basic.forever(function () {
    let display = GAME_ZIP64.createZIP64Display()

    display.showColor(GAME_ZIP64.rgb(bg_red, bg_green, bg_blue))
})