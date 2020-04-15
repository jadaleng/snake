let bg_red = 0;
let bg_green = 0;
let bg_blue = 0;
let hue = 0;
let display = GAME_ZIP64.createZIP64Display();

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
    bg_green = hue2rgb(hue) * 255;
    bg_blue = hue2rgb(hue - 1 / 3) * 255;
}

basic.forever(function () {
   

    display.showColor(GAME_ZIP64.rgb(bg_red, bg_green, bg_blue))
    basic.pause(100)
    hue++;
    hue = hue%360;
})