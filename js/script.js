'use strict'


const canv = document.getElementById('canv');
const ctx = canv.getContext('2d');
canv.width = window.innerWidth;
canv.height = window.innerHeight;

const listElements = [];

class Head {
    constructor(options) {
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.x = options.y;
        this.y = options.y;
        this.speed = options.speed;
        this.directionHorizontal = this.speed;
        this.directionVertical = 0;
        this.listCoordsWay = [];
        
        this.control();
        this.createTarget();
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

    move() {
        this.listCoordsWay.push([this.x, this.y]);
        if(this.listCoordsWay.length > this.width / this.speed + 3) this.listCoordsWay.shift();

        this.x += this.directionHorizontal;
        this.y += this.directionVertical;

        this.paymentDirections();

        this.checkClash(this.target);
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

    createTarget() {
        this.target = new Target({
            width: 20,
            height: 20,
            x: Math.random() * (canv.width - 0) + 0,
            y: Math.random() * (canv.height - 0) + 0,
            color: 'green'
        });
    }

    checkClash(target) {
        if(this.x + this.width >= target.x && this.x <= target.x + target.width) {
            if(this.y + this.height >= target.y && this.y <= target.y + target.height) {
                this.createTarget();
                createPartBody(listElements[listElements.length - 1]);
            }
        }
    }
}

class Target {
    constructor(options) {
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.x = options.x;
        this.y = options.y;
    }
}

class PartBody {
    constructor(options) {
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.guiding = options.guiding;
        this.x = this.guiding.x;
        this.y = this.guiding.y;
        this.speed = options.speed;
        this.listCoordsWay = [];
    }

    move() {
        this.listCoordsWay.push([this.x, this.y]);
        if(this.listCoordsWay.length > this.width / this.speed + 3) this.listCoordsWay.shift();

        this.x = this.guiding.listCoordsWay[0][0];
        this.y = this.guiding.listCoordsWay[0][1];   
    }
}



const head = new Head({
    width: 25,  
    height: 25,
    color: 'red',
    x: 10,
    y: 10,
    speed: 1
});
listElements.push(head);

function createPartBody(guiding) {
    const partBody = new PartBody({
        width: 25,  
        height: 25,
        color: '#000',
        guiding: guiding,
        speed: 1
    });
    listElements.push(partBody);
}

createPartBody(head);

requestAnimationFrame(function draw() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    [...listElements, listElements[0].target].forEach(item => {
        ctx.beginPath();
        ctx.fillStyle = item.color;
        ctx.rect(item.x, item.y, item.width, item.height);
        ctx.fill();
        if(item.move) item.move();
        
    });

    requestAnimationFrame(draw);
});


