/**
 * Moving connected dot background system
 * Jujin Kim(jujin@jujinkim.com)
 */

 let dotMovingBG = function() {

    /* SETTINGS */
    let dotCntReferDocSize = true;
    let dotCount = 50;
    let dotMaxCount = 100;
    let dotColor = "#ffffff";
    let dotConnected = true;
    let trackCursor = true;
    let dotCanvasName = "canvasDotBg";
    let cSizeFitDocSize = true;
    let cWidth = 800;
    let cHeight = 600;
    let dotMinSize = 3;
    let dotMaxSize = 4;
    let dotMaxSpeed = 80;
    let dotMinSpeed = 30;
    let maxDotConnectedDist = 300;
    /* End Settings */

    let dotCanvas;
    let dotContext;

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
                    this.y = -dotMaxSize - cHeight*0.1;
                    this.vx = Math.random() * dotMaxSpeed * 2 - (dotMaxSpeed);
                    this.vy = Math.random() * (dotMaxSpeed - dotMinSpeed) + dotMinSpeed;
                break;
                case 1:
                    // right
                    this.x = cWidth + dotMaxSize + cWidth*0.1;
                    this.y = Math.random() * cHeight;
                    this.vx = Math.random() * (dotMaxSpeed - dotMinSpeed) + dotMinSpeed * -1;
                    this.vy = Math.random() * dotMaxSpeed * 2 - (dotMaxSpeed);
                break;
                case 2:
                    // bottom
                    this.x = Math.random() * cWidth;
                    this.y = cHeight + cHeight * 0.1;
                    this.vx = Math.random() * dotMaxSpeed * 2 - (dotMaxSpeed);
                    this.vy = Math.random() * (dotMaxSpeed - dotMinSpeed) + dotMinSpeed * -1;
                break;
                case 3:
                    // left
                    this.x = -dotMaxSize - cWidth * 0.1;
                    this.y = Math.random() * cHeight;
                    this.vx = Math.random() * (dotMaxSpeed - dotMinSpeed) + dotMinSpeed;
                    this.vy = Math.random() * dotMaxSpeed * 2 - (dotMaxSpeed);
                break;
            }
        };
        this.move = function(deltaTime) {
            this.x += this.vx * deltaTime;
            this.y += this.vy * deltaTime;
            if(this.x < -dotMaxSize - cWidth*0.1 || 
                this.x >= cWidth + dotMaxSize + cWidth * 0.1 || 
                this.y < -dotMaxSize - cHeight*0.1 || 
                this.y >= cHeight + dotMaxSize + cHeight * 0.1) {
                this.init();
            }
        }
    }

    this.initDotMovingBG = function() {
        if(cSizeFitDocSize) {
            cWidth = window.innerWidth;
            cHeight = window.innerHeight;
        };
    
        //get canvas context
        dotCanvas = document.getElementById(dotCanvasName);
        dotCanvas.width = cWidth;
        dotCanvas.height = cHeight;
        dotContext = dotCanvas.getContext("2d");
        
        //setting canvas
        dotContext.imageSmoothingEnabled = false;  //concept: no anti-alias

        if(dotCntReferDocSize) {
            dotCount = Math.floor(window.innerWidth * window.innerHeight / 20000);
            if(dotMaxCount > 0 && dotCount > dotMaxCount) dotCount = dotMaxCount;
        }

        if(trackCursor) {
            dotCanvas.addEventListener('mousemove', setLastDotFromCursor, false);
        }

        dots = [];
        for(i=0; i<=dotCount; i++) {   //last dot = cursor
            let ndot = new dot();
            ndot.init();
            dots.push(ndot);
        }

        update();
    };

    let lastFrameTime = 0;
    function update() {
        requestAnimationFrame(update);

        let frameTime = Date.now();
        let deltaTime = frameTime - lastFrameTime;
        deltaTime = deltaTime *= 0.001;

        // move dots
        for(i=0; i<dotCount; i++) {
            dots[i].move(deltaTime);
        }

        draw();
        lastFrameTime = frameTime;
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

            if(dotConnected) {
                for(j=i+1; j<=dotCount; j++) {
                    let dist = Math.abs(dots[i].x - dots[j].x) + Math.abs(dots[i].y - dots[j].y);
                    if(dist <= maxDotConnectedDist) {
                        let opacity = 1-(dist/maxDotConnectedDist);
                        dotContext.strokeStyle = "rgba(255,255,255,"+opacity+")";
                        dotContext.beginPath();
                        let lineS = dots[i].size*0.5;
                        let lineE = dots[j].size*0.5;
                        dotContext.moveTo(dots[i].x+lineS, dots[i].y+lineS);
                        dotContext.lineTo(dots[j].x+lineE, dots[j].y+lineE);
                        dotContext.stroke();
                    }
                }
            }
        }
    }


    function setLastDotFromCursor(evt) {
        var rect = dotCanvas.getBoundingClientRect(), // abs. size of element
            scaleX = dotCanvas.width / rect.width,    // relationship bitmap vs. element for X
            scaleY = dotCanvas.height / rect.height;  // relationship bitmap vs. element for Y
    
        
        let x = (evt.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
        let y = (evt.clientY - rect.top) * scaleY;     // been adjusted to be relative to element
        dots[dotCount].x = x;
        dots[dotCount].y = y;
        
    }
}