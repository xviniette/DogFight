var Client = function(){
	this.pid;
	this.room;
	this.display = new Display(this);
}

Client.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}
