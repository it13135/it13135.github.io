var gm;
$(function(){
  imageObj.src = 'images/grid4x4.png';
  gm = new game(4,4, 60);
  gm.draw();
}
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
window.onload = function() {
context.fillStyle = 'red';
var imageObj = new Image();
//var images = [];
//imageObj.onload = function() {
//  context.drawImage(imageObj,0,0,60,60,0,0,60,60);
//};
}	
function game(xtiles, ytiles, size){
	this.xtiles = xtiles;
	this.ytiles = ytiles;
	this.size = size;
	this.tiles = [];
	for( var i=1; i<=xtiles; i++)  //rows
		for( var j=1; i<=ytiles; i++)  //columns
			this.tiles.push(new tile(i,j));
	this.draw = DrawGame;
}
function tile(x,y){
	this.xreal=x;
	this.yreal=y;
	this.x=x;
	this.y=y;
	this.move=Move();
}

function Move(){
	alert("move");
}

function DrawGame(){
	$.each(game.tiles, function(i, item){
		var xfrom = (j-1)*60;
		var xto = x + this.size;
		var yfrom = (i-1)*60;
		var yto = y + this.size;
		context.drawImage(imageObj, xfrom, yfrom, xto, yto, xfrom, yfrom, xto, yto);
	});
}