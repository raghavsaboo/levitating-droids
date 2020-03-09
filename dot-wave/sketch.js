let framerate = 60;
let t = 0;
let canvas
let width = 640;
var capturer = new CCapture({
    format: 'png',
    framerate: framerate,
    name: 'dot-wave',
    quality: 100,
});

function setup(){
    let p5canvas = createCanvas(width, width);
    strokeWeight(f=5)
    canvas = p5canvas.canvas;
    capturer.start();
}

function draw(){
    let secondsElapsed = frameCount / framerate;
    if (secondsElapsed >= 10) {
        capturer.stop();
        capturer.save();
        noLoop();
        console.log(`Render time ${floor(millis() / 1000)} seconds`);
    }
    clear(t=map(sin(f+=0.01), -1, 1, 64, 200))
    for (y=4; y<width; y+=8) {
        for(x=4; x<width; x+=8) {
            point(cos(r=noise(x/width, y/width - f) * t) * TAU + x, sin(r) * TAU + y)
        }
    }
    capturer.capture(canvas);
}