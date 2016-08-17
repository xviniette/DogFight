$(function(){
	socket = io();

	socket.on("login", function(data){
		
	});

	socket.on("playerID", function(data){
		client.pid = data;
		vue.connected = true;
	});

	socket.on("init", function(data){
		var room = new Room({id:data.id});
		for(var i in data.players){
			room.addPlayer(new Player(data.players[i]));
		}
		client.room = room;
		console.log(client);
	});

	socket.on("snapshot", function(data){
	});

	socket.on("addPlayer", function(data){
	});

	socket.on("removePlayer", function(data){
	});

	
});