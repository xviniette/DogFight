var Room = function(json){
	this.id = 0;
	this.players = {};

	this.seed = Math.floor(Math.random() * 1000000000);

	this.lastUpdatePhysic = Date.now();
	this.lastUpdateNetwork = Date.now();

	this.init(json);
}

Room.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}

Room.prototype.update = function(){
	var now = Date.now();
	var d = 1/FPS * 1000;
	while(now - this.lastUpdatePhysic >= d){
		this.physic();
		this.lastUpdatePhysic += d;
	}

	var dn = 1/NETWORK_FPS * 1000;
	while(now - this.lastUpdateNetwork >= dn){
		this.snapshot();
		this.lastUpdateNetwork += dn;
	}
}

Room.prototype.physic = function(){

}

Room.prototype.snapshot = function(){
	var snapshot = this.getSnapshot();
	for(var i in this.players){
		Utils.msgTo(this.players[i].socket, "snapshot", snapshot);
	}
}

Room.prototype.addPlayer = function(player){
	player.room = this;
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
	player.room = null;
	delete this.players[player.id];

	if(IS_SERVER){
		for(var i in this.players){
			Utils.msgTo(this.players[i].socket, "removePlayer", {id:player.id});
		}

		if(this.nbPlayers() == 0){
			game.deleteRoom(this.id);
		}
	}
}

Room.prototype.nbPlayers = function(){
	return Object.keys(this.players).length; 
}

Room.prototype.isFull = function(){
	return this.nbPlayers() >= MAX_PLAYER; 
}

Room.prototype.getInformations = function(){
	var ps = {};

	for(var i in this.players){
		ps[i] = this.players[i].getInformations();
	}

	var datas = {
		id:this.id,
		seed:this.seed,
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