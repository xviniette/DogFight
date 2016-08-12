var Player = function(json){
	this.id = 0;
	this.pseudo = "";
	this.socket = null;

	this.inputs = [];

	this.init(json);
}

Player.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}
