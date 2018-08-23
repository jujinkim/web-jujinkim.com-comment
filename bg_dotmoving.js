/**
 * Moving connected dot background system
 * Jujin Kim(jujin@jujinkim.com)
 */

/* SETTINGS */
let dotCntReferDocSize = true;
let dotCount = 50;
let dotMaxCount = 100;
let dotColor = "#000000";
let dotConnected = true;
let trackCursor = true;
let dotCanvasName = "canvasDotBg";
let cSizeFitDocSize = true;
let cWidth = 800;
let cHeight = 600;
let dotMinSize = 3;
let dotMaxSize = 5;
let dotMaxSpeed = 3;
let dotMinSpeed = 2;
let maxDotConnectedDist = 100;
/* End Settings */

let dotCanvas;
let cotContext;

let dots = [];
let dot = function() {
    this.x; this.y; this.vx; this.vy; this.size;
    this.init = function() {
        this.size = Math.random() * (dotMaxSize - dotMinSize) + dotMinSize;
        let startLine = Math.floor(Math.random() * 4);
        switch(startLine) {
            case 0:
                // top
                this.x = Math.random() * cWidth;
                this.y = -dotMaxSize;
                this.vx = Math.random() * dotMaxSpeed * 2 - (dotMaxSpeed);
                this.vy = Math.random() * (dotMaxSpeed - dotMinSpeed) + dotMinSpeed;
            break;
            case 1:
                // right
                this.x = cHeight + dotMaxSize;
                this.y = Math.random() * cHeight;
                this.vx = Math.random() * (dotMaxSpeed - dotMinSpeed) + dotMinSpeed * -1;
                this.vy = Math.random() * dotMaxSpeed * 2 - (dotMaxSpeed);
            break;
            case 2:
                // bottom
                this.x = Math.random() * cWidth;
                this.y = cHeight;
                this.vx = Math.random() * dotMaxSpeed * 2 - (dotMaxSpeed);
                this.vy = Math.random() * (dotMaxSpeed - dotMinSpeed) + dotMinSpeed * -1;
            break;
            case 3:
                // left
                this.x = -dotMaxSize;
                this.y = Math.random() * cHeight;
                this.vx = Math.random() * (dotMaxSpeed - dotMinSpeed) + dotMinSpeed;
                this.vy = Math.random() * dotMaxSpeed * 2 - (dotMaxSpeed);
            break;
        }
    };
    this.move = function() {
        this.x += this.vx;
        this.y += this.vy;
        if(this.x < dotMaxSize || this.x >= cWidth + dotMaxSize || this.y < dotMaxSize || this.y >= cHeight + dotMaxSize) {
            this.init();
        }
    }
}

 function initDotMovingBG() {
    //get canvas context
    dotCanvas = document.getElementById(dotCanvasName);
    dotCanvas.width = cWidth;
    dotCanvas.height = cHeight;
    dotContext = dotCanvas.getContext("2d");
    
    //setting canvas
    dotContext.imageSmoothingEnabled = false;  //concept: no anti-alias

    if(dotCntReferDocSize) {
        dotCount = window.innerWidth * window.innerHeight / 10000;
        if(dotMaxCount > 0 && dotCount > dotMaxCount) dotCount = dotMaxCount;
    }

    dots = [];
    for(i=0; i<dotCount+1; i++) {   //last dot = cursor
        let ndot = new dot();
        ndot.init();
        dots.push(ndot);
    }

    update();
 }

 function update() {
     requestAnimationFrame(update);

    // move dots
    for(i=0; i<dotCount; i++) {
        dots[i].move();
    }

    draw();
 }

 /**
  * Draw current dots' position and lines
  */
 function draw() {
    dotContext.clearRect(0, 0, dotCanvas.width, dotCanvas.height);

    // draw dot and line
    for(i=0; i<dotCount; i++) {
        dotContext.fillStyle = dotColor;
        dotContext.fillRect(dots[i].x, dots[i].y, dots[i].size, dots[i].size);

        for(j=i+1; j<dotCount+1; j++) {
            let dist = Math.abs(dots[i].x - dots[j].x) + Math.abs(dots[i].y - dots[j].y);
            if(dist <= maxDotConnectedDist) {
                let opacity = 1-(dist/maxDotConnectedDist);
                dotContext.strokeStyle = "rgba(0,0,0,"+opacity+")";
                dotContext.beginPath();
                dotContext.moveTo(dots[i].x, dots[i].y);
                dotContext.lineTo(dots[j].x, dots[j].y);
                dotContext.stroke();
            }
        }
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
      
        return {
          x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
          y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    }
 }