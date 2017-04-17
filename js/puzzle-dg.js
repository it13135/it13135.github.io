/**
 *
 * Puzzle box game jQuery plugin
 * 
 * Copyright 2013, Dhiraj kumar
 * http://www.css-jquery-design.com
 */

var zi = 1;
$.fn.extend({
    puzzle_dg: function(e) {
		var no = getSelection();
        var EmptySquare = no*no;
        var t = "#" + $(this).attr("id");
        var n = e + "px";
        var r = e * no + "px";
        $(t).html('<div id="board"></div>');
        $("#board").css({
            position: "absolute",
            width: r,
            height: r,
            border: "1px solid gray"
        });
        for (var i = 0; i < EmptySquare; i++) {
            $("#board").append("<div id='tile" + i + "' style='left: " + i % no * e + "px; top: " + Math.floor(i / no) * e + "px; width: " + e + "px; height: " + e + "px; background-position: " + -(i % no) * e + "px " + -Math.floor(i / no) * e + "px ' title=" + (i + 1) + "></div>");
			$("#tile"+i).attr({"row": Math.floor(i / no), "col": i%no, 
			                   "currentrow": Math.floor(i / no), "currentcol": i%no});
        }
        $("#board").children("div:nth-child(" + EmptySquare + ")").css({
            backgroundImage: "",
            background: "#ffffff"
        });
        $("#board").children("div").click(function() {
            Move(this, e);
        });
    }
});

function Move(e, t) {
    var n = false;
    var no = getSelection();
	var EmptySquare = no*no;
	var lastTile = $("#board").children("div:nth-child(" + EmptySquare + ")");
    var r = lastTile.css("left");
    var i = lastTile.css("top");
	var lastRow = lastTile.attr("currentrow");
	var lastCol = lastTile.attr("currentcol");
	var eRow = $(e).attr("currentrow");
	var eCol = $(e).attr("currentcol");
    var s = $(e).css("left");
    var o = $(e).css("top");
    if (r == s && o == parseInt(i) - t + "px") n = true;
    if (r == s && o == parseInt(i) + t + "px") n = true;
    if (parseInt(r) - t + "px" == s && o == i) n = true;
    if (parseInt(r) + t + "px" == s && o == i) n = true;
    if (n) {
        $(e).css("z-index", zi++);
        $(e).animate({
            left: r,
            top: i
        }, 200, function() {
            lastTile.css("left", s).attr({"currentrow": eRow, "currentcol": eCol});
            lastTile.css("top", o);
        }).attr({"currentrow": lastRow, "currentcol": lastCol});
    }
	var man = 0;
	for (var i = 0; i < EmptySquare; i++) {
		var r1 = $("#tile"+i).attr("currentrow");
		var r2 = $("#tile"+i).attr("row");
		var c1 = $("#tile"+i).attr("currentcol");
		var c2 = $("#tile"+i).attr("col");
		man += Math.abs(parseInt(r1)-parseInt(r2))+Math.abs(parseInt(c1)-parseInt(c2));
	}
	$("#info2").text(man);
}

function getSelection(){
	return $("#selection").val();
}

function mix(){
	startGame();
	 var no = getSelection();
     tiles = [];
     for (i = 0; i < no; i++){
       for(j = 0; j < no ; j++){
	     if (!((i==no-1)&&(j==no-1)))
           tiles.push(i * no + j);
       }
     }
	 shuffle(tiles);
	 $.each(tiles, function(i, item){
		 $("#tile"+item).detach().prependTo("#board");
		 $("#tile"+item).css("left",(i%no)* 60);
		 $("#tile"+item).css("top", Math.floor(i/no)*60);
		 $("#tile"+item).attr({"currentrow":Math.floor(i/no), "currentcol":i%no});
	 });
}

function startGame(){
   var selection = $("#selection").val();	   
   $("#game_area").css("width", selection * 60).css("height", selection * 60);
   $('#game_area').puzzle_dg(60);
   $("#board div").removeClass().addClass("x"+selection);	
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  var info = "";
  $.each(array, function(i, item){
	  info += (item +1 ) + ",";
  });
  $("#info1").text(info);
  return array;
}