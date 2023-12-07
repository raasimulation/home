let circleX, circleY;
let isHolding = false;
let hearts = [];
let backgroundImage;

function preload() {
  backgroundImage = loadImage('mother.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleX = width / 2.2;
  circleY = height / 1.45;
}

function draw() {
  background(backgroundImage);

  if (isHolding) {
    let heart = new Heart(circleX, circleY);
    hearts.push(heart);
  }

  for (let i = hearts.length - 1; i >= 0; i--) {
    hearts[i].update();
    hearts[i].display();
    if (hearts[i].isFinished()) {
      hearts.splice(i, 1);
    }
  }

  noStroke();
  fill(255, 255, 255, 200);
  ellipse(circleX, circleY, 50, 50);
  glow(color(255, 255, 255, 255), 7);
}

function glow(glowColor, blurriness) {
  let offsetX = map(mouseX, 0, width, 10, -10);
  let offsetY = map(mouseY, 0, height, 10, -10);
  drawingContext.shadowOffsetX = offsetX;
  drawingContext.shadowOffsetY = offsetY;
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}

function mousePressed() {
  let d = dist(mouseX, mouseY, circleX, circleY);
  if (d < 25) {
    isHolding = true;
  }
}

function mouseReleased() {
  isHolding = false;
}

class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = createVector(random(-3, 3), random(-2, -4));
    this.size = random(10, 50);
    this.emoji = "💗💖❤️";
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.y += 0.1;
  }

  display() {
    textSize(this.size);
    text(this.emoji, this.x, this.y);
  }

  isFinished() {
    return this.y > height;
  }
}
