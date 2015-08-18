// target frames per second
const FPS = 30;
const SECONDSBETWEENFRAMES = 1 / FPS;
const PXPERSECOND = 400;
const TAILLENGTH = 80;
var image = new Image();
//image.src = "jsplatformer2-smiley.jpg";
var canvas = null;
var context2D = null;
var currentFunction = null;
var currentTime = 0;
var currentX = 0;
var currentY = 0;
var xArray=new Array(0,0,0,0,0,0,0,0,0,0);
var yArray=new Array(300,300,300,300,300,300,300,300,300,300);
var sineWave = 0;
var wavestatus = 0;
const WAVEAMP = 200;
var ws_uri = "ws://localhost:9000";


window.onload = init;

function init()
{
	canvas = document.getElementById('canvas');
	context2D = canvas.getContext('2d');
	setInterval(draw, SECONDSBETWEENFRAMES * 1000);
    currentX = canvas.width;
    currentY = canvas.height/2; 
    
    //Initiate websocket
    if ("WebSocket" in window) 
    {webSocket = new WebSocket(ws_uri);}
    else {webSocket = new MozWebSocket(ws_uri);}
    webSocket.onmessage = function(e)
    {
        console.log("Got echo: " + e.data);
    }
}

function draw()
{
    currentTime += SECONDSBETWEENFRAMES;
    // clear everything   
    context2D.clearRect(0, 0, canvas.width, canvas.height);
    context2D.save();
    updateArray();
    drawArray();
	context2D.restore();
}

function updateArray()
{
    currentX += SECONDSBETWEENFRAMES * PXPERSECOND;
    currentX = currentX%canvas.width;
    xArray.shift();
    xArray.push(currentX);
    updateY();
    yArray.shift();
    yArray.push(currentY)
}

function drawArray()
{
var i = 0;
context2D.fillStyle = "green"; 
context2D.strokeStyle =  "green"; 
context2D.lineWidth = 2;
context2D.beginPath();
context2D.moveTo(xArray[i], yArray[i]);
for (i=1;i<10;i++)
    {
        if (xArray[i]-xArray[i-1]<0)
        {
            context2D.closePath();
            context2D.stroke();
            context2D.beginPath();
            context2D.moveTo(xArray[i], yArray[i]);
        }
        context2D.lineTo(xArray[i], yArray[i]);       
        //context2D.fillRect(xArray[i], yArray[i],10, 10);
    }
context2D.stroke();
context2D.closePath();
}

function updateY()
{
currentY = Math.sin(2*3.14*(wavestatus/500)) * WAVEAMP + canvas.height/2;
if (wavestatus < 500)
    {
    wavestatus = wavestatus + 100;
    }

}

function pulse()
{
    wavestatus = 0;    
}


