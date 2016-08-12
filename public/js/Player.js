var Player = function(json){
	this.id = 0;
	this.pseudo = "";
	this.socket;

	this.room;

	this.inputs = [];

	this.position = {
		x:0,
		y:0,
		z:0
	};

	this.rotation = {
		x:0,
		y:0,
		z:0
	};

	this.speed = 5;

	this.radius = 10;

	this.life = 100;
	this.alive = true;

	this.kills = 0;
	this.deaths = 0;

	this.init(json);
}

Player.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}
