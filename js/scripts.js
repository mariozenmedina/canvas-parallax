const canvas = document.getElementById('canvas');

const animations = [
    {
        src: "./img/ipe.png",
        loaded: false,
        scrolls: [
            {
                scroll: (el) => 0,
                x: (el) => 1000,
                y: (el) => 800,
                width: (el) => el.width,
                height: (el) => el.height,
                opacity: (el) => 1,
            },
            {
                scroll: (el) => 2000,
                x: (el) => 200,
                y: (el) => 100,
                width: (el) => el.width,
                height: (el) => el.height,
                opacity: (el) => .1,
            },
            {
                scroll: (el) => 4000,
                x: (el) => 0,
                y: (el) => 0,
                width: (el) => el.width,
                height: (el) => el.height,
                opacity: (el) => 1,
            },
            {
                scroll: (el) => 6000,
                x: (el) => 1200,
                y: (el) => -100,
                width: (el) => el.width,
                height: (el) => el.height,
                opacity: (el) => .5,
            },
        ]
    },
    {
        src: "./img/passaro.png",
        loaded: false,
        scrolls: [
            {
                scroll: (el) => 0,
                x: (el) => window.innerWidth / 2 - el.canvasWidth / 2,
                y: (el) => 0,
                width: (el) => el.width,
                height: (el) => el.height,
                opacity: (el) => 1,
            },
            {
                scroll: (el) => 4000,
                x: (el) => window.innerWidth / 2 - el.canvasWidth / 2,
                y: (el) => 600,
                width: (el) => el.width * 3,
                height: (el) => el.height * 3,
                opacity: (el) => .1,
            },
            {
                scroll: (el) => document.body.scrollHeight - window.innerHeight,
                x: (el) => window.innerWidth / 2 - el.canvasWidth / 2,
                y: (el) => 0,
                width: (el) => el.width * 2,
                height: (el) => el.height * 2,
                opacity: (el) => 1,
            },
        ]
    },
];

let canvasZen = new CanvasZen(canvas, animations);