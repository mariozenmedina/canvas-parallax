const canvas = document.getElementById('canvas');

const animations = [
    {
        src: "./img/ipe.png",
        loaded: false,
        scrolls: {
            0: {
                x: 1000,
                y: 800,
                opacity: 1,
            },
            2000: {
                x: 200,
                y: 100,
                opacity: .1,
            },
            4000: {
                x: 0,
                y: 0,
                opacity: 1,
            },
            6000: {
                x: 1200,
                y: -100,
                opacity: .5,
            },
        }
    },
    {
        src: "./img/passaro.png",
        loaded: false,
        scrolls: {
            0: {
                x: 100,
                y: 100,
                opacity: 0,
            },
            4000: {
                x: 300,
                y: 200,
                opacity: 1,
            },
        }
    },
];

let canvasZen = new CanvasZen(canvas, animations);