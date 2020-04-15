
/**
 * Provides access to basic micro:bit functionality.
 */
//% color=190 weight=100 icon="\uf11b" block="Game64Tools"
namespace MPGame64Tools {

    /**
     * A hue, saturation and luminance to RGB conversion function
     */
    //% block="get color with hue $hue| saturation $sat| and lightness $lum"
    //% hue.shadow="colorWheelHsvPicker"
    export function hslToRgb(hue : number = 0, sat : number = 255, lum : number = 128)  {
        hue %= 256;
        let v : number;
        let r,g,b : number;

        v = (lum < 128) ? (lum * (256 + sat)) >> 8 : (((lum + sat) << 8) - lum * sat) >> 8;
        if (v <= 0) {
            r = g = b = 0;
        } else {
            let m : number;
            let sextant : number;
            let fract, vsf, mid1, mid2 : number;

            m = lum + lum - v;
            hue *= 6;
            sextant = hue >> 8;
            fract = hue - (sextant << 8);
            vsf = v * fract * (v - m) / v >> 8;
            mid1 = m + vsf;
            mid2 = v - vsf;
            switch (sextant) {
                case 0: r = v; g = mid1; b = m; break;
                case 1: r = mid2; g = v; b = m; break;
                case 2: r = m; g = v; b = mid1; break;
                case 3: r = m; g = mid2; b = v; break;
                case 4: r = mid1; g = m; b = v; break;
                case 5: r = v; g = m; b = mid2; break;
            }
        }

        return GAME_ZIP64.rgb(r,g,b);
    }

    enum Hue {
        Red=0,
        Orange=28,
        Yellow=2*28,
        Green=3*28,
        Turquoise=4*28,
        Blue=5*28,
        Violet=6*28,
        Purple=7*28,
        Pink=8*28
    }

    enum Saturation {
        Strong=255,
        Normal=200,
        Faded=150,
        Pale=100,
        Paler=50,
        Colorless=0
    }

    enum Brightness {
        White=255,
        Pastell=200,
        Light=150,
        Intense=127,
        SlightlyDarker=100,
        Draker=50,
        Dark=25,
        Black
    }

    /**
     * A hue, saturation and luminance to RGB conversion function
     */
    //% block="get color with hue $hue| saturation $sat| and lightness $lum"
    //% hue.shadow="colorWheelHsvPicker"
    export function color(hue : Hue = Hue.Red, sat : Saturation = Saturation.Normal, lum : Brightness = 128)  {

    }
};

