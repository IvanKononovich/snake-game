'use strict'


const canv = document.getElementById('canv');
const ctx = canv.getContext('2d');
canv.width = window.innerWidth;
canv.height = window.innerHeight;


class Head {
    constructor(options) {
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.x = options.x;
        this.y = options.y;
        this.speed = options.speed;
        this.directionHorizontal = this.speed;
        this.directionVertical = 0;

        this.draw = this.draw.bind(this);

        this.control();

        requestAnimationFrame(this.draw);
    }

    control() {
        document.addEventListener('keydown', e => {
            if(e.keyCode === 39) {
                this.directionVertical = 0;
                this.directionHorizontal = this.speed;
            }
            if(e.keyCode === 37) {
                this.directionVertical = 0;
                this.directionHorizontal = this.speed * -1;
            }
            if(e.keyCode === 38) {
                this.directionHorizontal = 0;
                this.directionVertical = this.speed * -1;
            }
            if(e.keyCode === 40) {
                this.directionHorizontal = 0;
                this.directionVertical = this.speed;
            }
        });
    }

    draw() {
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.beginPath();

        ctx.rect(this.x + this.directionHorizontal, this.y + this.directionVertical, this.width, this.height);
        
        this.x += this.directionHorizontal;
        this.y += this.directionVertical;

        this.paymentDirections();

        ctx.fill();

        requestAnimationFrame(this.draw);
    }

    paymentDirections() {
        if(this.x + this.width >= canv.width) {
            this.directionHorizontal = this.speed * -1;
            this.x += this.directionHorizontal;
        }

        if(this.x <= 0) {
            this.directionHorizontal = this.speed;
            this.x += this.directionHorizontal;
        }

        if(this.y + this.height >= canv.height) {
            this.directionVertical = this.speed * -1;
            this.y += this.directionVertical;
        }

        if(this.y <= 0) {
            this.directionVertical = this.speed;
            this.y += this.directionVertical;
        }
    }

}

const head = new Head({
    width: 20,  
    height: 20,
    color: '#000',
    x: 100,
    y: 100,
    speed: 5
});
