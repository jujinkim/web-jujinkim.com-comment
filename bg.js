/*
JujinKim.com dynamic background script
*/
let canvas;
let context;

let mountains = [];
let stars = [];
let clouds = [];
let light;

let bgColor =  [{r : 180, g : 255, b : 200},
                {r : 255, g : 120, b : 120}, 
                {r : 60, g : 40, b : 220}];
let skyColor = [{r : 190, g : 190, b : 215},
                {r : 200, g : 160, b : 160}, 
                {r : 20, g : 20, b : 120}];
let timeColorNo;

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

    //get colorIndex from currentTime
    //morning
    if(time >= 6 && time <= 13) {
        timeColorNo = 0;
    }
    //afternoon
    else if(time > 13 && time <= 20) {
        timeColorNo = 1;
    }
    //night
    else {
        timeColorNo = 2;
    }

    //if in the day, draw sun
    //if in the night, draw moon and star


    //draw
    update(0);
}

function update(time) {
    //requestAnimationFrame(update);
    draw(time);
}

/**
 * Draw
 */
function draw(time) {
    //bg
    let grd = context.createLinearGradient(0, 600, 0, 0);
    grd.addColorStop(0, "rgb("+(skyColor[timeColorNo].r+40)+","+(skyColor[timeColorNo].g+40)+","+(skyColor[timeColorNo].b+40)+")");
    grd.addColorStop(1, "rgb("+skyColor[timeColorNo].r+","+skyColor[timeColorNo].g+","+skyColor[timeColorNo].b+")");
    context.fillStyle = grd;
    context.fillRect(0,0,800,500);
    //mountain
    for(i=mountains.length-1; i >=0 ; i--) {
        context.fillStyle = makeFadeColor(i+2, mountain.length+7, bgColor[timeColorNo].r, bgColor[timeColorNo].g, bgColor[timeColorNo].b);
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
 function star(count) {
    for(i = 0; i < count; i++) {
        star[i] = {x:Math.random() * 100, y:Math.random() * 100, velocity:Math.random * 5};
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

    console.log(rr, gg, bb, grgr, gray);
    return "#" + rr + gg + bb;
 }