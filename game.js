var c; 
var ctx; 

var p, b; 
var blocks = []; 
var colors = ['red', 'blue', 'yellow', 'pink', 'purple']; 

var Player = function(x, y){
	this.x = x; 
	this.y = y; 
	this.width = 100; 
	this.height = 20; 

	this.drawPlayer = function(){

		ctx.fillStyle = "red";
		ctx.beginPath(); 
		ctx.rect(this.x, this.y, this.width, this.height); 
		ctx.closePath(); 
		ctx.fill(); 
	}
}

var Block = function(x, y, color){
	this.x = x; 
	this.y = y; 
	this.width = 40; 
	this.height = 20;
	this.color = color;  

	this.drawBlock = function(){
		ctx.fillStyle = color; 
		ctx.beginPath(); 
		ctx.rect(this.x, this.y, this.width, this.height); 
		ctx.closePath(); 
		ctx.fill(); 
	}
}

var Ball = function(){
	this.x = c.width /2; 
	this.y = c.height /2;
	this.radius = 10; 

	this.drawBall = function(){
		ctx.beginPath(); 
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false); 
		ctx.fillStyle = "red"; 
		ctx.fill(); 
		ctx.lineWidth = 2; 
		ctx.strokeStyle = '#000000'; 
		ctx.stroke(); 
	}
}
// Initialize Game

function init(){

	c = document.getElementById("myCanvas"); 
	ctx = c.getContext("2d"); 
	ctx.translate(0.1, 0.1); 
	p = new Player(250, 550); 
	b = new Ball(); 
	createBlocks(); 
	setInterval(gameLoop, 10); 
}

function createBlocks(){

	var i, j; 

	var x = 50; 
	var y = 30; 
	var z = 0; 

	for(i = 0; i < 5; i++){

		x = 50; 

		for(j = 0; j < 5; j++){
			var tempBlock = new Block(x, y, colors[z]);
			blocks.push(tempBlock);  
			x += 85; 
		}

		z++; 
		y += 40; 
	}
}

function drawBlocks(){
	var i = 0; 
	while(i < blocks.length){
		ctx.fillStyle = blocks[i].color; 
		ctx.beginPath(); 
		ctx.rect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height); 
		ctx.closePath(); 
		ctx.fill(); 
		i++; 
	}
}

function gameLoop(){

	console.log("Running"); 

	clear(); 

	drawBlocks(); 
	p.drawPlayer(); 
	b.drawBall(); 
}

function clear(){
	ctx.clearRect(0,0,500,600); 
}

function getKeyDown(e){

	console.log("key pressed"); 

	switch(e.keyCode){

		// left arrow
		case 37: 
			p.x -= 5; 
			break;
		// right arrow
		case 39: 
			p.x += 5;  
			break; 
	}
}

window.addEventListener('keydown', getKeyDown, true); 