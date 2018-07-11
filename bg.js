/*
JujinKim.com dynamic background script
*/
let canvas;
let context;

let mountains = [];
let stars;
let clouds = [];
let light;

/**
 * Draw background
 */
function drawBackground() {
    //get canvas context
    canvas = document.getElementById("canvasBg");
    canvas.width = 800;
    canvas.height = 600;
    context = canvas.getContext("2d");
    
    //setting canvas
    context.imageSmoothingEnabled = false;  //concept: no anti-alias

    context.clearRect(0, 0, canvas.width, canvas.height);


    //get current time
    let time = new Date().getHours();

    //draw 3 mountains randomly
    mountain(0, 80, 83, 7);
    mountain(1, 65, 73, 10);
    mountain(2, 45, 55, 15);  

    //draw clouds

    //if in the day, draw sun
    //if in the night, draw moon and star


    //draw
    update(0);
}

function update(time) {
    requestAnimationFrame(update);
    draw(time);
}

/**
 * Draw
 */
function draw(time) {
    //mountain
    for(i=mountains.length-1; i >=0 ; i--) {
        context.fillStyle = makeGrayFadeColor(i, mountain.length);
        context.beginPath();
        context.moveTo(0, canvas.height);
        for(j=0; j<mountains[i].peaks.length; j++) {
            context.lineTo(pToX(mountains[i].peaks[j].x), pToY(mountains[i].peaks[j].y));
            context.lineTo(pToX(mountains[i].volleys[j].x), pToY(mountains[i].volleys[j].y));
        }
        
        context.lineTo(canvas.width, pToY(mountains[i].peaks[0].y));
        context.lineTo(canvas.width, canvas.height);
        context.closePath();
        context.fill();

    }
}

/**
 * Create mountain
 */
function mountain(idx, top, bottom, range) {
    let peakCnt = Math.floor((Math.random() * 10) + 5);
    let peaks = [];
    let volleys = [];
    for(i=0; i<peakCnt; i++)
    {
        let px = 100/peakCnt;
        px = px * i;
        px = i>0?px + Math.floor((Math.random() * 30/peakCnt) - 30/peakCnt):0;
        peaks[i] = {x:px,
                    y:Math.floor((Math.random() * range) + top)};

        let vx = 100/peakCnt;
        vx = vx * i;
        vx = vx + Math.floor((Math.random() * 30/peakCnt));
        volleys[i] = {x:vx,
                      y:Math.floor((Math.random() * range) + bottom)};
    }

    mountains[idx] = {peaks:peaks, volleys:volleys};
}

/**
 * Create clouds
 */
function cloud() {

}

/**
 * Create sun/moon
 */
 function sunmoon() {

 }

 /**
  * Create stars
  */
 function star() {

 }

 /**
  * Convert percent to px: X
  */
 function pToX(val) {
    return canvas.width/100*val;
 }

/**
  * Convert percent to px: Y
  */
 function pToY(val) {
    return canvas.height/100*val;
 }

 /**
  * Make color grayScale color
  * @param {integer} val level. must smaller than totalsize
  * @param {integer} totalSize Totalsize 
  * @return {string} Color string
  */
 function makeGrayFadeColor(val, totalSize) {
    let ret = "#";

    let i = val/totalSize*16;
    i = i.toString(16);
    ret = ret + i + i + i;
    return ret;
 }