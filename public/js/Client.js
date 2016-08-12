var Client = function(){
	this.pid;
	this.room;
}

Client.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}
