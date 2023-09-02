
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

        const lowerBound = keys.toReversed().find( k => e.scrolls[k].scroll(e.el) <= scrollPos);
        const upperBound = keys.find( k => e.scrolls[k].scroll(e.el) >= scrollPos) || lowerBound;

        let xPos, yPos, width, height;
        //Set values
        if(lowerBound == upperBound || upperBound == undefined) {
            width = e.scrolls[lowerBound].width(e.el); e.el.canvasWidth = width;
            height = e.scrolls[lowerBound].height(e.el); e.el.canvasHeight = height;
            xPos = e.scrolls[lowerBound].x(e.el);
            yPos = e.scrolls[lowerBound].y(e.el);
            ctx.globalAlpha = e.scrolls[lowerBound].opacity(e.el) ?? 1;
        }
        else {
            const pct = (scrollPos - e.scrolls[lowerBound].scroll(e.el)) / (e.scrolls[upperBound].scroll(e.el) - e.scrolls[lowerBound].scroll(e.el));
            width = e.scrolls[lowerBound].width(e.el) + ( e.scrolls[upperBound].width(e.el) - e.scrolls[lowerBound].width(e.el) ) * pct;
            e.el.canvasWidth = width;
            height = e.scrolls[lowerBound].height(e.el) + ( e.scrolls[upperBound].height(e.el) - e.scrolls[lowerBound].height(e.el) ) * pct;
            e.el.canvasHeight = height;
            xPos = e.scrolls[lowerBound].x(e.el) + ( e.scrolls[upperBound].x(e.el) - e.scrolls[lowerBound].x(e.el) ) * pct;
            yPos = e.scrolls[lowerBound].y(e.el) + ( e.scrolls[upperBound].y(e.el) - e.scrolls[lowerBound].y(e.el) ) * pct;
            ctx.globalAlpha = e.scrolls[lowerBound].opacity(e.el) + ( e.scrolls[upperBound].opacity(e.el) - e.scrolls[lowerBound].opacity(e.el) ) * pct;
        }

        ctx.drawImage(e.el, xPos, yPos, width, height);

    }

    #loading() {
        return this.animations.some(img => !img.loaded);
    }
}