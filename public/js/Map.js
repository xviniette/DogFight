var Map = function(){
	this.ground;

	this.generateGround(10, 10, 0, 200, 4574);
}

Map.prototype.generateGround = function(width, height, min, max, seed){
	var value = [];
	for(var i = 0; i < width; i++){
		value[i] = [];
		for(var j = 0; j < height; j++){
			value[i][j] = Math.floor(Math.random() * (max - min) + min);
		}
	}
	this.ground = value;
	return value;
}