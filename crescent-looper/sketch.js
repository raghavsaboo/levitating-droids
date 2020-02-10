let framerate = 30;
var capturer = new CCapture({
    format: 'png',
    framerate: framerate,
    name: 'crescent-looper',
    quality: 100,
});


function setup(){
    let p5canvas = createCanvas(800, 800);
    canvas = p5canvas.canvas;
    strokeWeight(0);
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
 
    background(0);
    translate(width / 2, height / 2);
    stroke(220);
    fill(255);
    ellipse(0, 0, 550, 550);
    fill(0);
    ellipse(7 * cos(frameCount * 0.07), 7 * sin(frameCount * 0.07), 545, 545);
    capturer.capture(canvas);
}