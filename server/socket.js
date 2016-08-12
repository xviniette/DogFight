io.on('connection', function(socket){
	socket.emit("login");

	socket.on("login", function(data){
		console.log(data);
		//PSEUDO / SKIN
		var id = playerIdGenerator.get();
		var player = new Player({
			id:id,
			pseudo:data.pseudo,
			socket:socket.id
		});

		game.addPlayer(player);
	});

	socket.on("respawn", function(data){

	});

	socket.on("changeRoom", function(data){

	});

	socket.on("inputs", function(data){

	});

	socket.on("disconnect", function(){
		var player = game.getPlayerBySocket(socket.id);
		if(player){
			playerIdGenerator.free(player.id);
		}
	});
});