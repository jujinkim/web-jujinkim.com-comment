/**
 * Moving connected dot background system
 * Jujin Kim(jujin@jujinkim.com)
 */

class DMBG {
    constructor() {}
}
/* SETTINGS */
DMBG.dotCntReferDocSize = true;
DMBG.dotCount = 50;
DMBG.dotMaxCount = 100;
DMBG.dotColor = "#ffffff";
DMBG.userDotColor = "#fdfd88";
DMBG.dotConnected = true;
DMBG.trackCursor = true;
DMBG.dotCanvasName = "canvasDotBg";
DMBG.cSizeFitDocSize = true;
DMBG.cWidth = 800;
DMBG.cHeight = 600;
DMBG.dotMinSize = 3;
DMBG.dotMaxSize = 4;
DMBG.dotMaxSpeed = 80;
DMBG.dotMinSpeed = 30;
DMBG.maxDotConnectedDist = 200;
/* End Settings */

class DotMovingBG {
    constructor() {
        this.dotCanvas;
        this.dotContext;
        this.dots = [];
        this.lastFrameTime = Date.now(); // for frame update

        this.update;
    };

    /** Initialize */
    initDotMovingBG() {
        if (DMBG.cSizeFitDocSize) {
            DMBG.cWidth = window.innerWidth;
            DMBG.cHeight = window.innerHeight;

            window.addEventListener('resize', function() {
                DMBG.cWidth = window.innerWidth;
                DMBG.cHeight = window.innerHeight;
                this.dotCanvas.width = DMBG.cWidth;
                this.dotCanvas.height = DMBG.cHeight;
                console.log('resizzzz');
            }.bind(this), false);
        }
        
        //get canvas context
        this.dotCanvas = document.getElementById(DMBG.dotCanvasName);
        this.dotCanvas.width = DMBG.cWidth;
        this.dotCanvas.height = DMBG.cHeight;
        this.dotContext = this.dotCanvas.getContext("2d");
        //setting canvas
        this.dotContext.imageSmoothingEnabled = false; //concept: no anti-alias
        if (DMBG.dotCntReferDocSize) {
            DMBG.dotCount = Math.floor(window.innerWidth * window.innerHeight / 20000);
            if (DMBG.dotMaxCount > 0 && DMBG.dotCount > DMBG.dotMaxCount)
            DMBG.dotCount = DMBG.dotMaxCount;
        }
        if (DMBG.trackCursor) {
            document.addEventListener('mousemove', this.setLastDotFromCursor.bind(this), false);
        }
        this.dots = [];
        for (i = 0; i <= DMBG.dotCount; i++) { //last dot = cursor
            let ndot = new Dot();
            ndot.init();
            this.dots.push(ndot);
        }
        this.update();
    }

    update() {
        window.requestAnimationFrame(this.update.bind(this));
        let frameTime = Date.now();
        let deltaTime = frameTime - this.lastFrameTime;
        deltaTime = deltaTime * 0.001;
        // move dots
        for (i = 0; i < DMBG.dotCount; i++) {
            this.dots[i].move(deltaTime);
        }
        this.draw();
        this.lastFrameTime = frameTime;
    }

    /** Draw current dots' position and lines */
    draw() {
        this.dotContext.clearRect(0, 0, this.dotCanvas.width, this.dotCanvas.height);
        // draw dot and line
        for (i = 0; i < DMBG.dotCount; i++) {
            this.dotContext.fillStyle = DMBG.dotColor;
            this.dotContext.fillRect(this.dots[i].x, this.dots[i].y, this.dots[i].size, this.dots[i].size);
            if (DMBG.dotConnected) {
                for (j = i + 1; j <= DMBG.dotCount; j++) {
                    let dist = Math.abs(this.dots[i].x - this.dots[j].x) + Math.abs(this.dots[i].y - this.dots[j].y);
                    if (dist <= DMBG.maxDotConnectedDist) {
                        let opacity = 1 - (dist / DMBG.maxDotConnectedDist);
                        this.dotContext.strokeStyle = "rgba(255,255,255," + opacity + ")";
                        this.dotContext.beginPath();
                        let lineS = this.dots[i].size * 0.5;
                        let lineE = this.dots[j].size * 0.5;
                        this.dotContext.moveTo(this.dots[i].x + lineS, this.dots[i].y + lineS);
                        this.dotContext.lineTo(this.dots[j].x + lineE, this.dots[j].y + lineE);
                        this.dotContext.stroke();
                    }
                }
            }
        }

        // draw user dot
        this.dotContext.fillStyle = DMBG.userDotColor;
        this.dotContext.fillRect(this.dots[DMBG.dotCount].x, 
                                this.dots[DMBG.dotCount].y, 
                                this.dots[DMBG.dotCount].size, 
                                this.dots[DMBG.dotCount].size);
    }
    
    /** Get Cursor's position to set cursor dot pos */
    setLastDotFromCursor(evt) {
        var rect = this.dotCanvas.getBoundingClientRect(), // abs. size of element
            scaleX = this.dotCanvas.width / rect.width, // relationship bitmap vs. element for X
            scaleY = this.dotCanvas.height / rect.height; // relationship bitmap vs. element for Y
        let x = (evt.clientX - rect.left) * scaleX; // scale mouse coordinates after they have
        let y = (evt.clientY - rect.top) * scaleY; // been adjusted to be relative to element
        this.dots[DMBG.dotCount].x = x - this.dots[DMBG.dotCount].size * 0.5;
        this.dots[DMBG.dotCount].y = y - this.dots[DMBG.dotCount].size * 0.5;
    }
}

class Dot {
    constructor() {
        this.x;
        this.y;
        this.vx;
        this.vy;
        this.size;
    }

    // Initialize;
    init() {
        this.size = Math.random() * (DMBG.dotMaxSize - DMBG.dotMinSize) + DMBG.dotMinSize;
        let startLine = Math.floor(Math.random() * 4);
        switch (startLine) {
            case 0:
                // top
                this.x = Math.random() * DMBG.cWidth;
                this.y = -DMBG.dotMaxSize - DMBG.cHeight * 0.1;
                this.vx = Math.random() * DMBG.dotMaxSpeed * 2 - (DMBG.dotMaxSpeed);
                this.vy = Math.random() * (DMBG.dotMaxSpeed - DMBG.dotMinSpeed) + DMBG.dotMinSpeed;
                break;
            case 1:
                // right
                this.x = DMBG.cWidth + DMBG.dotMaxSize + DMBG.cWidth * 0.1;
                this.y = Math.random() * DMBG.cHeight;
                this.vx = Math.random() * (DMBG.dotMaxSpeed - DMBG.dotMinSpeed) + DMBG.dotMinSpeed * -1;
                this.vy = Math.random() * DMBG.dotMaxSpeed * 2 - (DMBG.dotMaxSpeed);
                break;
            case 2:
                // bottom
                this.x = Math.random() * DMBG.cWidth;
                this.y = DMBG.cHeight + DMBG.cHeight * 0.1;
                this.vx = Math.random() * DMBG.dotMaxSpeed * 2 - (DMBG.dotMaxSpeed);
                this.vy = Math.random() * (DMBG.dotMaxSpeed - DMBG.dotMinSpeed) + DMBG.dotMinSpeed * -1;
                break;
            case 3:
                // left
                this.x = -DMBG.dotMaxSize - DMBG.cWidth * 0.1;
                this.y = Math.random() * DMBG.cHeight;
                this.vx = Math.random() * (DMBG.dotMaxSpeed - DMBG.dotMinSpeed) + DMBG.dotMinSpeed;
                this.vy = Math.random() * DMBG.dotMaxSpeed * 2 - (DMBG.dotMaxSpeed);
                break;
            }
        }
        
        // Move dot
        move(deltaTime) {
            this.x += this.vx * deltaTime;
            this.y += this.vy * deltaTime;
            if (this.x < -DMBG.dotMaxSize - DMBG.cWidth * 0.1 ||
                this.x >= DMBG.cWidth + DMBG.dotMaxSize + DMBG.cWidth * 0.1 ||
                this.y < -DMBG.dotMaxSize - DMBG.cHeight * 0.1 ||
                this.y >= DMBG.cHeight + DMBG.dotMaxSize + DMBG.cHeight * 0.1) {
                this.init();
            }
        };
    
}