var Room = function(){
	this.id = 0;
	this.players = {};
}

Room.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}

Room.prototype.update = function(){

}

Room.prototype.addPlayer = function(player){
	this.players[player.id] = player;

	if(IS_SERVER){
		Utils.msgTo(player.socket, "init", this.getInformations());
		var pInformations = player.getInformations();
		for(var i in this.players){
			if(this.players[i].id != player.id){
				Utils.msgTo(this.players[i].socket, "addPlayer", pInformations);
			}
		}
	}
}

Room.prototype.removePlayer = function(player){
	delete this.players[player.id];

	if(IS_SERVER){
		for(var i in this.players){
			tils.msgTo(this.players[i].socket, "removePlayer", {id:player.id});
		}
	}
}

Room.prototype.isFull = function(){
	return Object.keys(this.players).length > MAX_PLAYER; 
}

Room.prototype.getInformations = function(){
	var ps = {};

	for(var i in this.players){
		ps[i] = this.players[i].getInformations();
	}

	var datas = {
		id:this.id,
		players:ps
	};

	return datas;
}

Room.prototype.getSnapshot = function(){
	var ps = {};
	
	for(var i in this.players){
		ps[i] = this.players[i].getSnapshot();
	}

	var datas = {
		players:ps
	};

	return datas;
}