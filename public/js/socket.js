$(function(){
	var socket = io();

	socket.on("login", function(data){
		socket.emit("login", {pseudo:"lol"});
	});

	socket.on("playerID", function(data){
		client.pid = data;
	});

	socket.on("init", function(data){
		var room = new Room({id:data.id});
		for(var i in data.players){
			room.addPlayer(new Player(data.players[i]));
		}
		client.room = room;
	});
});