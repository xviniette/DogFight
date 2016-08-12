var Game = function(json){
	this.players = {};
	this.rooms = {};

	this.init(json);
}

Game.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}


Game.prototype.start = function(){

}

Game.prototype.addPlayer = function(player){
	this.players[player.socket] = player;
}

Game.prototype.removePlayer = function(player){
	delete this.players[player.socket];
}

Game.prototype.newRoom = function(){
	var id = roomIdGenerator.get();
	var room = new Room();
	this.rooms[id] = room;
	return room;
}

Game.prototype.deleteRoom = function(){

}

Game.prototype.getPlayerBySocket = function(socket){
	if(this.players[socket]){
		return this.players[socket];
	}
	return null;
}

Game.prototype.getPlayerById = function(id){
	for(var i in this.players){
		if(this.players[i].id == id){
			return this.players[i];
		}
	}
	return null;
}

Game.prototype.getRoom = function(id){
	if(this.rooms[id]){
		return this.rooms[i];
	}
	return null;
}

Game.prototype.getAccessibleRoom = function(){
	for(var i in this.rooms){
		if(!this.rooms[i].isFull()){
			return this.rooms[i];
		}
	}
	//new room
	return this.newRoom();
}

Game.prototype.nbPlayers = function(){
	return Object.keys(this.players).length;
}