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
    var r = $("#board").children("div:nth-child(" + EmptySquare + ")").css("left");
    var i = $("#board").children("div:nth-child(" + EmptySquare + ")").css("top");
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
            $("#board").children("div:nth-child(" + EmptySquare + ")").css("left", s);
            $("#board").children("div:nth-child(" + EmptySquare + ")").css("top", o);
        });
    }
}

function getSelection(){
	return $("#selection").val();
}

function shuffle(){
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
		 $("tile"+item).detach.prependTo("#board");
	 });
}

function startGame(){
   var selection = $("#selection").val();	   
   $("#game_area").css("width", selection * 60).css("height", selection * 60);
   $('#game_area').puzzle_dg(60);
   $("#board div").removeClass().addClass("x"+selection);	
}
