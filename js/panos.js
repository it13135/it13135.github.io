var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
var imageObj = new Image();
var gm;
$(function(){
  imageObj.src = 'images/grid4x4.png';
  gm = new game(4,4, 60);
  gm.draw();
});
function game(xtiles, ytiles, size){
	this.xtiles = xtiles;
	this.ytiles = ytiles;
	this.size = size;
	this.tiles = [];
	for( var i=1; i<=xtiles; i++)  //rows
		for( var j=1; j<=ytiles; j++)  //columns
			this.tiles.push(new tile(i,j));
	this.draw = DrawGame;
}
function tile(x,y){
	this.xreal=x;
	this.yreal=y;
	this.x=x;
	this.y=y;
	this.move=Move;
}

function Move(){
	alert("move");
}

function DrawGame(){
	var thisgame = this;
	$.each(thisgame.tiles, function(){
		var xfrom = (this.xreal)*60;
		var xto = xfrom + thisgame.size;
		var yfrom = (this.yreal)*60;
		var yto = yfrom + thisgame.size;
		context.drawImage(imageObj, xfrom, yfrom, xto, yto, xfrom, yfrom, xto, yto);
	});
}