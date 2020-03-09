let framerate = 60;
let t = 0;
let canvas
let width = 640;
let f = 5;

var capturer = new CCapture({
    format: 'png',
    framerate: framerate,
    name: 'dot-wave',
    quality: 100,
});

function setup(){
    let p5canvas = createCanvas(width, width);
    canvas = p5canvas.canvas;
    strokeWeight(5);
    background(51);
    loop();
    capturer.start();
}

function draw(){
    let secondsElapsed = frameCount / framerate;
    if (secondsElapsed >= 5) {
        capturer.stop();
        capturer.save();
        noLoop();
        console.log(`Render time ${floor(millis() / 1000)} seconds`);
    }
    strokeWeight(2);
    background(51);
    t=map(sin(f+=0.01), -1, 1, 64, 200);
    for (y=-20; y<width+20; y+=5) {
        for(x=-20; x<width+20; x+=5) {
            stroke("white")
            point(cos(r=noise(x/width, y/width - f) * t) * TAU + x, sin(r) * TAU + y);
        }
    }
    capturer.capture(canvas);
}