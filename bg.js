/*
JujinKim.com dynamic background script
*/
let WIDTH = 800;
let HEIGHT = 600;

let canvas;
let context;

let mountains = [];
let stars = [];
let clouds = [];
let light;

let bgColor =  [{r : 180, g : 255, b : 200},
                {r : 255, g : 120, b : 120}, 
                {r : 60, g : 40, b : 220}];
let skyColor = [{r : 170, g : 180, b : 230},
                {r : 200, g : 90, b : 40}, 
                {r : 30, g : 20, b : 90}];
let timeColorNo;

/**
 * Draw background
 */
function drawBackground() {
    //set canvas size (default is 800x600 but will be overwritten)
    WIDTH = window.innerWidth * 0.7;
    HEIGHT = window.innerHeight * 0.7;

    //get canvas context
    canvas = document.getElementById("canvasBg");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    context = canvas.getContext("2d");
    
    //setting canvas
    context.imageSmoothingEnabled = false;  //concept: no anti-alias

    context.clearRect(0, 0, canvas.width, canvas.height);


    //get current time
    let time = new Date().getHours();

    //draw 3 mountains randomly
    mountain(0, 70, 80, 7);
    mountain(1, 58, 70, 8);
    mountain(2, 45, 58, 9);  

    //draw clouds

    //get colorIndex from currentTime
    //morning
    if(time >= 7 && time <= 15) {
        timeColorNo = 0;
    }
    //afternoon
    else if(time > 15 && time <= 20) {
        timeColorNo = 1;
    }
    //night
    else {
        timeColorNo = 2;
    }

    //if in the day, draw sun and clouds
    if (timeColorNo == 0) {

    }
    //if in the afternoon, draw sun
    else if (timeColorNo == 1) {

    }
    //if in the night, draw moon and star
    else if(timeColorNo == 2) {
        //generate stars
        let starCnt = window.innerWidth / 10;
        star(starCnt);
    }

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
    //bg
    let grd = context.createLinearGradient(0, HEIGHT-100, 0, 0);
    grd.addColorStop(0, "rgb("+(skyColor[timeColorNo].r+40)+","+(skyColor[timeColorNo].g+40)+","+(skyColor[timeColorNo].b+40)+")");
    grd.addColorStop(1, "rgb("+skyColor[timeColorNo].r+","+skyColor[timeColorNo].g+","+skyColor[timeColorNo].b+")");
    context.fillStyle = grd;
    context.fillRect(0,0,WIDTH,HEIGHT-100);

    //star
    if(timeColorNo == 2) {
        for(i=0; i < stars.length; i++) {
            context.fillStyle = "#FFFFCA";
            context.fillRect(stars[i].left, stars[i].top, stars[i].size, stars[i].size);
            //move stars
            stars[i].left += stars[i].size*0.01;
            if(stars[i].left > WIDTH) {
                stars[i].left = WIDTH - stars[i].left - stars[i].size;
            }
        }
    }

    //mountain
    for(i=mountains.length-1; i >=0 ; i--) {
        context.fillStyle = makeFadeColor(i+4, mountain.length+8, bgColor[timeColorNo].r, bgColor[timeColorNo].g, bgColor[timeColorNo].b);
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
    let peakCnt = Math.floor((Math.random() * (window.innerWidth / 250)) + (window.innerWidth / 250));
    if(peakCnt < 1) peakCnt = 1;
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
 function star(count) {
    for(i = 0; i < count; i++) {
        stars[i] = {left : Math.floor((Math.random() * WIDTH)),
                    top : Math.floor((Math.random() * HEIGHT-100)),
                    size : Math.random() * 1 + 1}
        }
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
  * Make faded color
  * @param {integer} val level. must smaller than totalsize
  * @param {integer} totalSize Totalsize 
  * @return {string} Color string
  */
 function makeFadeColor(val, totalSize, r, g, b) {

    let i = Math.floor(val/totalSize*16);   //color : hex
    i = i.toString(16);

    return makeTintColor(r, g, b, i);
 }

 /**
  * Make tinted color
  * @param {integer} r 
  * @param {integer} g 
  * @param {integer} b 
  * @param {integer} gray 
  */
 function makeTintColor(r, g, b, gray) {
    let grgr = gray / 255;
    let rr = Math.floor(r * grgr);
    let gg = Math.floor(g * grgr);
    let bb = Math.floor(b * grgr);

    return "#" + rr + gg + bb;
 }