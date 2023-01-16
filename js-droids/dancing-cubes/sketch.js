// Original GIF: https://beesandbombs.tumblr.com/post/149654056864/cube-wave
// Reproduced by CodingTrain (Daniel Schiffman): https://youtu.be/H81Tdrmz2LA

let angle = 0;
let w = 40;
let framerate = 30;
let ma;
let maxD;
let canvas
var capturer = new CCapture({
    format: 'png',
    framerate: framerate,
    name: 'dancing_cubes',
    quality: 100,
});

function setup() {
    let p5canvas = createCanvas(500, 500, WEBGL);
    canvas = p5canvas.canvas;
    ma = atan(cos(QUARTER_PI));
    maxD = dist(1, 0, 150, 100);
    capturer.start();
}

function draw() {
    let secondsElapsed = frameCount / framerate;
    if (secondsElapsed >= 10) {
        capturer.stop();
        capturer.save();
        noLoop();
        console.log(`Render time ${floor(millis() / 1000)} seconds`);
    }
    background(210);
    ortho(-width, width, height, -height, 10, 1000);
    rotateX(-ma)
    rotateY(QUARTER_PI);
    for (let z = 0; z < height; z += w) {
        for (let x = 0; x < width; x += w) {
            push();
            let d = dist(x, z, width / 2, height / 2);
            let offset = map(d, 0, maxD, -PI^2, PI);
            let a = angle + offset;
            let h = floor(map(sin(a), -1, 1, 50, 300));
            translate(x - width / 2, 0, z - height / 2);
            normalMaterial();
            box(w, h, w, 500000, 500000);
            pop();
        }
    }

    angle -= 0.05;

    // Code for drawing the frame
    capturer.capture(canvas);
}