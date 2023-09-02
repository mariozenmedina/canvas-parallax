const canvas = document.getElementById('canvas');

const animations = [
    {
        src: "./img/ipe.png",
        loaded: false,
        scrolls: [
            {
                scroll: () => 0,
                x: () => 1000,
                y: () => 800,
                opacity: () => 1,
            },
            {
                scroll: () => 2000,
                x: () => 200,
                y: () => 100,
                opacity: () => .1,
            },
            {
                scroll: () => 4000,
                x: () => 0,
                y: () => 0,
                opacity: () => 1,
            },
            {
                scroll: () => 6000,
                x: () => 1200,
                y: () => -100,
                opacity: () => .5,
            },
        ]
    },
    {
        src: "./img/passaro.png",
        loaded: false,
        scrolls: [
            {
                scroll: () => 0,
                x: () => 100,
                y: () => 100,
                opacity: () => 1,
            },
            {
                scroll: () => 3000,
                x: () => 2000,
                y: () => 2000,
                opacity: () => 1,
            },
            {
                scroll: () => document.body.scrollHeight - window.innerHeight,
                x: () => 0,
                y: () => 0,
                opacity: () => 1,
            },
        ]
    },
];

let canvasZen = new CanvasZen(canvas, animations);