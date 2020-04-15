
/**
 * Provides access to basic micro:bit functionality.
 */
//% color=190 weight=100 icon="\uf11b" block="Game64Tools"
namespace Game64Tools {

    /**
     * A hue, saturation and luminance to RGB conversion function
     */
    //% block
    export function hueSatLightToColor(hue : number, sat : number, lum : number): number {

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
};

