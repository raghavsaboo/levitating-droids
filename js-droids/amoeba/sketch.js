var num = 80;
var flip = 1;

let framerate = 60;
let canvas

var capturer = new CCapture({
    format: 'png',
    framerate: framerate,
    name: 'dot-wave',
    quality: 100,
});

function setup() {
    let p5canvas = createCanvas(800, 800);
    canvas = p5canvas.canvas;
    loop();
    capturer.start();
}

function draw() {
    let secondsElapsed = frameCount / framerate;
    if (secondsElapsed >= 5) {
        capturer.stop();
        capturer.save();
        noLoop();
        console.log(`Render time ${floor(millis() / 1000)} seconds`);
    }
	background('#5F7470');
	stroke('white');

	for (var i = 0; i < num; i++) {
        t = frameCount / 60.0 * TWO_PI,
        angle = TWO_PI / num * i,
        d = map(sin(t + angle * 3), -1, 1, 200, 300),
        x = width / 2 + cos(angle) * d,
        y = height / 2 + sin(angle) * d,
        dd = 10;
        x2 = map(sin(t), -1, 1, width / 2 - dd, width / 2 + dd) + cos(angle) * 20,
        y2 = map(cos(t), -1, 1, width / 2 - dd, width / 2 + dd) + sin(angle) * 20,
        x3 = map(sin(t), -1, 1, width / 2 - dd, width / 2 + dd) + cos(angle) * 20,
        y3 = map(cos(t), -1, 1, width / 2 - dd, width / 2 + dd) + sin(angle) * 20,
        sz = map(sin(t + angle * 3), -1, 1, 25, 75),
        sz2 = map(sin(t + angle * 3), -1, 1, 0, sz * .9);
        sz3 = map(sin(t + angle * 3), -1, 1, -25, sz * .8);
        line(width/2,height/2,x,y);
		noFill();
		ellipse(x, y, sz, sz);
		ellipse(x, y, sz2, sz2);
		ellipse(x, y, sz3, sz3);
		fill('white');
        ellipse(x, y, 5, 5);
    }
    capturer.capture(canvas);
}