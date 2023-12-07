let geese = [];
let gooseCount = 0;
let counterFontSize = 72;
let confettis = [];
let gooseImage;
let celebrationImage;
let fadeAlpha = 0;
let bg;


function preload() {
    gooseImage = loadImage('goose.png');
    celebrationImage = loadImage('birthday.jpeg');
    bg = loadImage('field.jpeg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 10; i++) {
        geese.push({
            x: random(width),
            y: random(height),
            size: random(120, 200),
            caught: false,
            speedX: random(-30, 30),
            speedY: random(-30, 30)
        });
    }
}

function draw() {
    let bgX = (width/2);
    let bgY = (height/2);
    image(bg, bgX, bgY);
    bg.resize(width, height);
    updateGeese();
    displayCounter();

    if (gooseCount === 10) {
        displayCelebration();
    }
}

function mousePressed() {
    checkCatch();
}

function updateGeese() {
    for (let goose of geese) {
        if (!goose.caught) {
            goose.x += goose.speedX;
            goose.y += goose.speedY;

            if (goose.x > width) {
                goose.x = 0;
            } else if (goose.x < 0) {
                goose.x = width;
            }

            if (goose.y > height) {
                goose.y = 0;
            } else if (goose.y < 0) {
                goose.y = height;
            }

            imageMode(CENTER);
            image(getGooseImage(), goose.x, goose.y, goose.size, goose.size);
        }
    }
}


function checkCatch() {
    for (let goose of geese) {
        if (!goose.caught && dist(mouseX, mouseY, goose.x, goose.y) < goose.size / 2) {
            goose.caught = true;
            gooseCount++;
        }
    }
}

function displayCounter() {
    textSize(counterFontSize);
    fill(255);
    textAlign(CENTER, CENTER);
    text(gooseCount + "/10", width / 2, height / 2);
}

function displayCelebration() {
    for (let i = 0; i < 5; i++) {
        confettis.push(new Confetti(random(width), 0, random(1, 3)));
    }

    for (let confetti of confettis) {
        confetti.confettiDisplay();
    }

    if (fadeAlpha < 400) {
        fadeAlpha += 1;
    }

    tint(255, fadeAlpha);
    imageMode(CENTER);
    image(celebrationImage, width / 2, height / 2);
    noTint();
}

class Confetti {
    constructor(_x, _y, _s) {
        this.x = _x;
        this.y = _y;
        this.speed = _s;
        this.time = random(0, 100);
        this.color = color(random(255), random(255), random(255));
        this.amp = random(2, 30);
        this.phase = random(0.5, 2);
        this.size = random(width / 25, height / 50);
        this.form = round(random(0, 1));
    }

    confettiDisplay() {
        fill(this.color);
        noStroke();
        push();
        translate(this.x, this.y);
        translate(this.amp * sin(this.time * this.phase), this.speed * cos(2 * this.time * this.phase));
        rotate(this.time);
        rectMode(CENTER);
        scale(cos(this.time / 4), sin(this.time / 4));
        if (this.form === 0) {
            rect(0, 0, this.size, this.size / 2);
        } else {
            ellipse(0, 0, this.size);
        }
        pop();

        this.time = this.time + 0.1;
        this.speed += 1 / 200;
        this.y += this.speed;
    }
}

function getGooseImage() {
    return gooseImage;
}  
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    bg.resize(width, height);
}

