const canvas = document.getElementById('canvas');

const animations = [
    {
        src: "./img/ipe.png",
        loaded: false,
        opacity: .5,
        scrolls: {
            0: {
                x: 0,
                y: 0
            },
            200: {
                x: 200,
                y: 100
            },
        }
    },
    {
        src: "./img/passaro.png",
        loaded: false,
        scrolls: {
            0: {
                x: 100,
                y: 100
            },
            200: {
                x: 300,
                y: 200
            },
        }
    },
];

let canvasZen = new CanvasZen(canvas, animations);