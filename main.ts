
/**
 * Provides access to basic micro:bit functionality.
 */
//% color=190 weight=100 icon="\uf11b" block="Game64Tools"
namespace Game64Tools {

    function hslToRgb(h : number, s : number, l : number) : Array<number> {
        
    }

    /**
     * A function that returns a non-void argument generates a reporter block (oval shape).
     */
    //% block
    export function hueSatLightToColor(h : number, s : number, l : number): number {
        let r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p : number, q : number, t : number)
            {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return GAME_ZIP64.rgb(Math.max(0, Math.min(Math.round(r * 255), 255)) 
            ,Math.max(0, Math.min(Math.round(g * 255), 255)) 
            ,Math.max(0, Math.min(Math.round(b * 255), 255)) );
    }
};

