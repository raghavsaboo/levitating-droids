let framerate = 60;
let t = 0;
let numLines = 60;
let canvas
var capturer = new CCapture({
    format: 'png',
    framerate: framerate,
    name: 'vintage-lines',
    quality: 100,
});

function setup(){
    let p5canvas = createCanvas(800, 800);
    canvas = p5canvas.canvas;
    capturer.start();
}

function draw(){
    let secondsElapsed = frameCount / framerate;
    if (secondsElapsed >= 60) {
        capturer.stop();
        capturer.save();
        noLoop();
        console.log(`Render time ${floor(millis() / 1000)} seconds`);
    }
    background(20);
    strokeWeight(5);
    translate(width/2, height/2)
    for (let i = 0; i < numLines; i++) {
        stroke(i*6);
        line(x1(t + i), y1(t + i), x2(t + i), y2(t + i))
    }
    t += 0.1;
    capturer.capture(canvas);
}

function x1(t) {
    return sin(t / 12) * 200 + sin(t / 5) * 2;
}

function y1(t) {
    return cos(t / 15) * 200;
}

function x2(t) {
    return sin(t / 15) * 400 + sin(t) * 2;
}

function y2(t) {
    return cos(t / 12) * 400 + cos(t / 12) * 20;
}