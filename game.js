var c; 
var ctx; 

var p, b; 
var blocks = []; 
var colors = ['red', 'blue', 'yellow', 'pink', 'purple']; 

var Player = function(x, y){
	this.x = x - 50; 
	this.y = y; 
	this.width = 100; 
	this.height = 20; 
}

Player.prototype.drawPlayer = function(){

	ctx.fillStyle = "red";
	ctx.beginPath(); 
	ctx.rect(this.x, this.y, this.width, this.height); 
	ctx.closePath(); 
	ctx.fill(); 
};

var Block = function(x, y, color){
	this.x = x; 
	this.y = y; 
	this.width = 40; 
	this.height = 20;
	this.color = color;  
};

Block.prototype.drawBlock = function(){
	ctx.fillStyle = color; 
	ctx.beginPath(); 
	ctx.rect(this.x, this.y, this.width, this.height); 
	ctx.closePath(); 
	ctx.fill(); 
};

var Ball = function(){
	this.x = c.width /2; 
	this.y = c.height /2;
	this.radius = 10; 
	this.holdBall = true; 

	this.dx = 3; 
	this.dy = -3; 
};

Ball.prototype.drawBall = function(){
	ctx.beginPath(); 

	if(this.holdBall == true){
		ctx.arc(p.x + (p.width / 2), p.y - 15, this.radius,0, 2*Math.PI, false); 

		this.x = p.x + (p.width / 2); 
		this.y = p.y - (p.height); 
	}
	else
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false); 

	ctx.fillStyle = "red"; 
	ctx.fill(); 
	ctx.lineWidth = 2; 
	ctx.strokeStyle = '#000000'; 
	ctx.stroke(); 
};

Ball.prototype.moveBall = function(){
	this.x += this.dx; 
	this.y += this.dy; 
};

Ball.prototype.collisionCheck = function(){
	var i = 0; 

	// Check if ball has collided with left or right wall
	if(this.x + this.radius >= c.width || this.x + this.radius <= 0){
		this.dx  = this.dx * -1; 
	}

	// check if ball has collided with top or bottom wall
	if(this.y + this.radius >= c.height || this.y + this.radius <= 0){
		this.dy = this.dy * -1; 
	}

	// Paddle collision
	if(this.x + this.radius > p.x && this.x < p.x + p.width && this.y + this.radius > p.y
		&& this.y < p.y + p.height)
	{
		//this.dx = this.dx * -1; 
		this.dy = this.dy * -1; 
	}


	// Loop through blocks array to check for collisions
	while(i < blocks.length){

		if(this.x + this.radius > blocks[i].x && this.x < blocks[i].x + blocks[i].width && this.y + this.radius > blocks[i].y
			&& this.y < blocks[i].y + blocks[i].height){
			 
			this.dy = this.dy * -1; 


			// Remove block from array
			blocks.splice(i, 1);  
		}

		i++; 
	}
};

// Initialize Game
function init(){

	c = document.getElementById("myCanvas"); 
	ctx = c.getContext("2d"); 
	p = new Player(c.width / 2, 550); 
	b = new Ball(); 
	createBlocks(); 
	setInterval(gameLoop, 10); 
};


// restart game on game over
function restartGame(){
	p = new Player(c.width / 2, 550); 
	b = new Ball(); 
	createBlocks(); 
};


// Create block objects and fill blocks array
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
		y += 30; 
	}
};

// Draw blocks on canvas
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
};


// Main game loop
function gameLoop(){
	clear(); 

	drawBlocks(); 
	p.drawPlayer(); 
	b.drawBall();

	if(b.holdBall == false)
		b.moveBall(); 

	b.collisionCheck();
};

// Clear canvas
function clear(){
	ctx.clearRect(0,0,500,600); 
};

// Handles keyboard input
function getKeyDown(e){

	switch(e.keyCode){

		// Spacebar
		case 32: 
			b.holdBall = false; 
			break; 
		// left arrow
		case 37: 
			p.x -= 10; 
			break;
		// right arrow
		case 39: 
			p.x += 10;  
			break; 
	}
};

window.addEventListener('keydown', getKeyDown, true); 