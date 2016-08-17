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
		h:0,
		v:0
	};

	this.vRotSpeed = 2 * Math.PI/100;
	this.maxvRotSpeed = 2 * Math.PI/3;

	this.speed = 5;

	this.radius = 10;

	this.life = 100;
	this.alive = true;

	this.kills = 0;
	this.deaths = 0;

	this.mesh;

	this.init(json);
}

Player.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}

Player.prototype.update = function(){
	
}

Player.prototype.spawn = function(){
	this.position.y = Math.random() * 10000 + 5000;
}

Player.prototype.getInformations = function(){
	var datas = {
		id:this.id,
		pseudo:this.pseudo,
		position:this.position,
		rotation:this.rotation,
		radius:this.radius,
		speed:this.speed,
		life:this.life,
		alive:this.alive,
		kills:this.kills,
		deaths:this.deaths
	};

	return datas;
}

Player.prototype.getSnapshot = function(){
	var datas = {
		id:this.id,
		position:this.position,
		rotation:this.rotation,
	};

	return datas;
}