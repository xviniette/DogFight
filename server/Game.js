var Game = function(json){
	this.players = {};
	this.rooms = [];

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

}

Game.prototype.nbPlayers = function(){
	return Object.keys(this.players).length;
}