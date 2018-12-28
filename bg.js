/*
JujinKim.com dynamic background script
*/
let WIDTH = 800;
let HEIGHT = 600;

let canvas;
let context;

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

    //draw
    draw();
}

/**
 * Draw
 */
function draw() {
    //bg
    context.fillStyle = "#232323";
    context.fillRect(0,0,WIDTH,HEIGHT);

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