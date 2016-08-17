var client;
var IS_SERVER = false;
var vue;
var socket;

$(function(){
	client = new Client();

	setInterval(function(){
		client.display.render();
	}, 1000/30)

	vue = new Vue({
		el:"#app",
		data:{
			pseudo:"",
			connected:false
		},
		methods:{
			connection:function(){
				socket.emit("login", {pseudo:this.pseudo});
			}
		}
	});

});