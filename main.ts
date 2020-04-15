

enum Saturation {
    //%block="A deeply"
    SuperIntense=255,
    //%block="A "
    Intense=200,
    //%block="A quite"
    Normal=150,
    //%block="A faded"
    Faded=100,
    //%block="A pale"
    Pale=50
}

enum Hue {
    //%block="red"
    Red=0,
    //%block="orange"
    Orange=28,
    //%block="yellow"
    Yellow=56,
    //%block="green"
    Green=84,
    //%block="turquoise"
    Turquoise=112,
    //%block="blue"
    Blue=140,
    //%block="violet"
    Violet=168,
    //%block="purple"
    Purple=196,
    //%block="pink"
    Pink=224
}

enum Brightness {
    //%block="pastell"
    Pastell=200,
    //%block="light"
    VeryLight=150,
    //%block="bright"
    Bright=127,
    //%block="dark"
    Dark=100,
    //%block="very dark"
    VeryDark=20,
    //%block="almost black"
    VeryVeryDark=5,
}

enum GameState {
    Intro,
    InGame,
    GameOver
}

//% fixedInstances
//% blockNamespace=Game64Tools
class GameContext {
    display: any;
    state: GameState;
    currentMask: Array<number>;
    onIntro: () => void;
    bgColor: number;

    constructor() {
        this.display = GAME_ZIP64.createZIP64Display();
        this.state = GameState.Intro;
        this.currentMask = [];
        this.onIntro = () => {};
        this.bgColor = -1;
    }

    renderBg() {
        if ( this.bgColor > 0 ) {
            for (let y = 0 ; y < 8 ; ++y ) {
                for (let x = 0 ; x < 8 ; ++x ) {
                    this.display.setMatrixColor(x, y, this.bgColor);
                }    
            }
        }
    }

    renderFrame() {
        this.display.clear();
        this.renderBg();
        this.display.show();
    }




}


/**
 * Provides access to basic micro:bit functionality.
 */
//% color=190 weight=100 icon="\uf11b" block="Mathea & Pappa"
namespace Game64Tools {

    //% fixedInstance
    export const GlobalGame = new GameContext();

    //%  block="on intro "
    export function gameIntro(handler : () => void) {
        handler();
        GlobalGame.onIntro = handler;
        GlobalGame.renderFrame();
    }


    //% block="set background color to %color"
    export function setBackgroundColor(color: number)  {
        GlobalGame.bgColor = color;
    }

    /**
     * A hue, saturation and luminance to RGB conversion function
     */
    //% block="color with hue $hue| saturation $sat| and brightness $lum"
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



    /**
     * A hue, saturation and luminance to RGB conversion function
     */
    //% block="$sat| $hue| color that is $lum"
    export function color(hue: Hue, sat: Saturation, lum: Brightness)  {
        return hslToRgb(hue, sat, lum);
    }

};

