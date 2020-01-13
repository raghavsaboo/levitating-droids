let framerate = 30;
var capturer = new CCapture({
    format: 'png',
    framerate: framerate,
    name: 'aztec_lines',
    quality: 100,
});

function setup() {
    let p5canvas = createCanvas(1000, 1000);
    canvas = p5canvas.canvas
    step = 20;
    x = 0;
    lines = [];
    frameRate(framerate);
    capturer.start();
}

function generateLines() {
    tempLines = [];
    for (var y = 0; y < height; y = y + step) {
        if (random() < 0.5) {
            tempLines.push({xStart: 0, yStart: y, xEnd: step, yEnd: y + step, stroke: 4 * random() + 1});
        }
        else {
            tempLines.push({xStart: step, yStart: y, xEnd: 0, yEnd: y + step, stroke: 4 + 1});
        }
    }
    lines.push(tempLines)
    x += step;
}

function updateLineArray() {
    if (x < width) {
        generateLines();
    }
    else {
        lines.shift();
        x -= step;
        generateLines();
    }
}

function draw() {
    let secondsElapsed = frameCount / framerate;
    if (secondsElapsed >= 10) {
        capturer.stop();
        capturer.save();
        noLoop();
        console.log(`Render time ${floor(millis() / 1000)} seconds`);
    }
    background(255, 204, 0);
    updateLineArray();
    for (var xIndex = 0; xIndex < lines.length; xIndex++) {
        yScanLines = lines[xIndex];
        for (var yIndex = 0; yIndex < yScanLines.length; yIndex++) {
            lineProps = yScanLines[yIndex];
            strokeWeight(lineProps['stroke']);
            line(lineProps['xStart'] + xIndex * step, lineProps['yStart'], lineProps['xEnd'] + xIndex * step, lineProps['yEnd']);
        }
    }
    capturer.capture(canvas)
}