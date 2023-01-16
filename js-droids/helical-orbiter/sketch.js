// Based on openprocessing.com/sketch/173429

let a = 45;
let lastx = 0;
let lasty = 0;
let framerate = 60;

var capturer = new CCapture({
    format: 'png',
    framerate: framerate,
    name: 'helical-orbiter',
    quality: 100,
});


function setup() {
    let p5canvas = createCanvas(800, 800);
    canvas = p5canvas.canvas;
    background(240);
    noStroke();
    capturer.start();
}

function draw() {
    background(240);
    smooth();
    let offset = height / 2;
    let scaleVal = height / 4;
    let angleInc = 10;
    let angle = 90;
    let secondsElapsed = frameCount / framerate;

    if (secondsElapsed >= 10) {
        capturer.stop();
        capturer.save();
        noLoop();
        console.log(`Render time ${floor(millis() / 1000)} seconds`);
    }
 
    for (y = height / 4; y <= (3 / 4) * height; y += height / 128) {
        x = offset + (cos(angle + a) * scaleVal);
        z = offset + (sin(angle + a) * scaleVal);
        ellipse(x, y, z / 64, z / 64);
        fill(0);
        stroke(0, 64);
        if (y != height / 4) {
            line(x, y, lastx, lasty);
        }

        lastx = x;
        lasty = y;
        angle += angleInc;
    }

    a += 0.01;

    capturer.capture(canvas);
}