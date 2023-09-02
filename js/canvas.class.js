
class CanvasZen {
    constructor(canvas, animations = []) {
        if( !canvas || canvas.tagName !== "CANVAS" ) {
            var error = new Error("A canvas element is needed.")
            throw (error.name = "ArgumentException") && error;
        }
        this.canvas = canvas;
        this.animations = animations;

        //Set canvas width and height
        this.#setCanvasSizes();

        //Load images to animations array
        this.#prepareImages();

        //Draw
        this.#draw();

        window.addEventListener("resize", () => {
            this.#setCanvasSizes();
            this.#draw();
        });

        window.addEventListener("scroll", () => {
            window.requestAnimationFrame( () => {
                this.#draw();
            });
        });
    }

    #setCanvasSizes() {
        this.canvas.setAttribute('width', window.innerWidth);
        this.canvas.setAttribute('height', window.innerHeight);
    }

    #prepareImages() {
        this.animations.map( (e, i) => {
            e.el = new Image();
            e.el.src = e.src;

            e.el.onload = () => {
                this.animations[i].loaded = true;
            }

            return e;
        });
    }

    #draw() {
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if( this.#loading() ){
            setTimeout( () => { this.#draw(); }, 1000);
        }
        else{
            this.animations.forEach( e => {
                this.#drawImageByScroll(ctx, e);
            });
        }

    }

    #drawImageByScroll(ctx, e) {
        
        //Find bottom and upper keys
        const scrollPos = window.scrollY;
        let keys = Object.keys(e.scrolls);
        keys = keys.map( k => parseInt(k) );

        const lowerBound = keys.toReversed().find( k => k <= scrollPos);
        const upperBound = keys.find( k => k >= scrollPos) || lowerBound;

        let xPos, yPos;
        //Set values
        if(lowerBound == upperBound || upperBound == undefined) {
            ctx.globalAlpha = e.scrolls[lowerBound].opacity ?? 1;
            xPos = e.scrolls[lowerBound].x;
            yPos = e.scrolls[lowerBound].y;
        }
        else {
            const pct = (scrollPos - lowerBound) / (upperBound - lowerBound);
            ctx.globalAlpha = e.scrolls[lowerBound].opacity + ( e.scrolls[upperBound].opacity - e.scrolls[lowerBound].opacity ) * pct;
            xPos = e.scrolls[lowerBound].x + ( e.scrolls[upperBound].x - e.scrolls[lowerBound].x ) * pct;
            yPos = e.scrolls[lowerBound].y + ( e.scrolls[upperBound].y - e.scrolls[lowerBound].y ) * pct;
        }

        ctx.drawImage(e.el, xPos, yPos, e.el.width, e.el.height);

    }

    #loading() {
        return this.animations.some(img => !img.loaded);
    }
}