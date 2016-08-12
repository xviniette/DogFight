$(function(){
	var socket = io();

	socket.on("login", function(data){
		console.log("xD");
		socket.emit("login", {pseudo:"lol"});
	});
});