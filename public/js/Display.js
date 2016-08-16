var Display = function(client){
	this.client = client;

	this.plane = null;

	this.skybox = null;

	this.three = {};
	this.init();
}

Display.prototype.initSkybox = function(){
	var cubeMap = new THREE.CubeTexture( [] );
	cubeMap.format = THREE.RGBFormat;
	var loader = new THREE.ImageLoader();
	loader.load('img/skybox.png', function ( image ) {
		var getSide = function ( x, y ) {
			var size = 512;
			var canvas = document.createElement( 'canvas' );
			canvas.width = size;
			canvas.height = size;
			var context = canvas.getContext( '2d' );
			context.drawImage(image, - x * size, - y * size);
			return canvas;
		};
		cubeMap.images[ 0 ] = getSide( 2, 1 );
		cubeMap.images[ 1 ] = getSide( 0, 1 );
		cubeMap.images[ 2 ] = getSide( 1, 0 );
		cubeMap.images[ 3 ] = getSide( 1, 2 ); 
		cubeMap.images[ 4 ] = getSide( 1, 1 );
		cubeMap.images[ 5 ] = getSide( 3, 1 );
		cubeMap.needsUpdate = true;
	});

	var cubeShader = THREE.ShaderLib[ 'cube' ];
	cubeShader.uniforms[ 'tCube' ].value = cubeMap;

	var skyBoxMaterial = new THREE.ShaderMaterial( {
		fragmentShader: cubeShader.fragmentShader,
		vertexShader: cubeShader.vertexShader,
		uniforms: cubeShader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	var skyBox = new THREE.Mesh(
		new THREE.BoxGeometry(1000000, 1000000, 1000000),
		skyBoxMaterial
		);

	this.skybox = skyBox;

	this.three.scene.add(this.skybox);
}

Display.prototype.updateSkybox = function(){
	this.skybox.position.x = this.three.camera.position.x;
	this.skybox.position.y = this.three.camera.position.y;
	this.skybox.position.z = this.three.camera.position.z;
}

Display.prototype.init = function(){
	var container = $('#webgl');

	var WIDTH = container.width(),
	HEIGHT = container.height();


	var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 1000000;


	this.three.renderer = new THREE.WebGLRenderer();
	this.three.camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	this.three.scene = new THREE.Scene();
	this.three.scene.add(this.three.camera);

	this.three.camera.z = 0;

	var _this = this;

	var loader = new THREE.OBJLoader();
	loader.load(
		'model/plane.obj',
		function ( object ) {
			_this.plane = object;
			_this.plane.position.z = -5000;
			_this.three.scene.add(_this.plane);
		}
		);

	var pointLight =
	new THREE.PointLight(0xFFFFFF);

	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	this.three.scene.add(pointLight);

	this.three.renderer.setSize(WIDTH, HEIGHT);

	this.initSkybox();

	container.append(this.three.renderer.domElement);
}

Display.prototype.render = function(){
	if(this.plane){
		this.plane.rotation.x += 0.1;
		this.plane.rotation.y += 0.1;
	}
	this.three.camera.position.z += 100;
	this.three.camera.rotation.y += 0.02;


	this.updateSkybox();
	this.three.renderer.render(this.three.scene, this.three.camera);
}